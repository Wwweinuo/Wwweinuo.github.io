---
title: Spring AOP 从入门到实践：原理、切点表达式与常见陷阱
date: 2026-07-13
tags: [Spring, Java, AOP]
summary: 从横切关注点出发，系统理解 Spring AOP 的核心概念、动态代理原理、通知类型、切点表达式和自调用失效问题，并通过方法耗时统计完成一次实战。
head:
  - - meta
    - name: description
      content: Spring AOP 入门与实践指南，涵盖核心概念、动态代理原理、通知类型、切点表达式、注解式切面和常见失效场景。
---

# Spring AOP 从入门到实践

在业务开发中，我们经常需要为许多方法添加相同的辅助逻辑，例如：

- 记录接口访问日志
- 统计方法执行耗时
- 开启、提交或回滚事务
- 校验用户权限
- 采集监控指标
- 实现缓存或重试

这些逻辑通常不属于某一项具体业务，却散落在大量业务方法中。如果直接复制粘贴，不仅会产生重复代码，还会让业务逻辑变得难以阅读。

Spring AOP 解决的正是这类问题：把分散在多个模块中的公共逻辑抽离成一个独立的**切面**，再统一应用到符合条件的方法上。

## 什么是 AOP

AOP 是 Aspect-Oriented Programming 的缩写，即**面向切面编程**。

面向对象编程擅长按照业务职责纵向划分类和模块，例如 `UserService`、`OrderService` 和 `PaymentService`。但日志、事务、权限等功能会横跨多个业务模块，因此也被称为**横切关注点**。

```text
                 UserService    OrderService    PaymentService
业务逻辑             │               │                │
─────────────────────┼───────────────┼────────────────┼────
日志                 ●               ●                ●
事务                 ●               ●                ●
权限                 ●               ●                ●
```

AOP 将这些横向重复的逻辑集中管理，让业务方法只关注自身职责。

需要注意的是，Spring AOP 的目标不是覆盖所有 AOP 场景。它与 Spring IoC 容器紧密集成，主要对 **Spring Bean 的方法执行**进行增强；如果需要拦截字段访问、构造器或非 Spring 对象，则应考虑使用完整的 AspectJ。

## 核心概念

初次接触 AOP 时，最容易被一组术语绕晕。可以把一次方法拦截理解为：**在指定的方法执行位置，按照指定时机插入一段公共逻辑。**

| 概念 | 含义 | 示例 |
|------|------|------|
| Aspect（切面） | 横切逻辑的集合 | 日志切面、权限切面 |
| Join Point（连接点） | 可以插入增强逻辑的位置 | Spring AOP 中主要是方法执行 |
| Pointcut（切点） | 用表达式筛选要拦截的连接点 | 拦截 `service` 包中的所有方法 |
| Advice（通知） | 在连接点执行的具体逻辑 | 方法执行前记录参数 |
| Target（目标对象） | 原始业务对象 | `UserService` Bean |
| Proxy（代理对象） | Spring 创建的增强对象 | 包装了 `UserService` 的代理 |
| Weaving（织入） | 将切面应用到目标对象的过程 | Spring 在运行时创建代理 |

其中最重要的三个问题是：

1. **在哪里执行？**——由切点决定。
2. **什么时候执行？**——由通知类型决定。
3. **执行什么？**——由通知方法中的代码决定。

## Spring AOP 的工作原理

Spring AOP 基于**动态代理**。当一个 Bean 匹配某个切面时，Spring 会为它创建代理对象；调用方实际拿到的是代理对象，而不是直接拿到原始对象。

```text
调用方 → 代理对象 → 切面逻辑 → 目标对象 → 目标方法
```

代理对象先执行匹配的通知，再决定是否调用目标方法。对于环绕通知，它还可以修改参数、返回值，甚至阻止目标方法执行。

Spring AOP 主要使用两种代理方式：

| 代理方式 | 原理 | 特点 |
|---------|------|------|
| JDK 动态代理 | 为目标对象实现的接口创建代理 | 代理的是接口中声明的方法 |
| CGLIB 代理 | 创建目标类的运行时子类 | 无需业务接口，但受继承规则限制 |

Spring Framework 的核心代理规则是：目标对象实现接口时可以使用 JDK 动态代理，否则使用 CGLIB。具体默认值还可能受到上层框架配置影响，例如 Spring Boot 默认启用基于类的代理，可通过 `spring.aop.proxy-target-class=false` 改用 JDK 代理。

由于 CGLIB 依赖继承实现代理，因此存在以下限制：

- `final` 类不能被继承，也就不能创建 CGLIB 代理。
- `final` 方法不能被覆盖，无法织入通知。
- `private` 方法对子类不可见，无法被代理增强。

## 五种常用通知

Spring AOP 提供五种常用通知类型：

| 注解 | 执行时机 | 典型用途 |
|------|---------|---------|
| `@Before` | 目标方法执行前 | 参数校验、权限检查 |
| `@After` | 目标方法结束后，无论成功还是异常 | 释放资源、记录结束日志 |
| `@AfterReturning` | 目标方法正常返回后 | 记录返回值、结果加工 |
| `@AfterThrowing` | 目标方法抛出异常后 | 异常监控、告警 |
| `@Around` | 包围整个目标方法 | 耗时统计、事务、缓存、重试 |

`@Around` 的控制能力最强，但也最容易被误用。环绕通知必须显式调用 `ProceedingJoinPoint.proceed()`，目标方法才会真正执行。

## 快速实战：统计 Service 方法耗时

下面以 Spring Boot 项目为例，统一统计 Service 层方法的执行时间。

### 添加依赖

Maven 项目添加：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

Gradle 项目添加：

```groovy
implementation 'org.springframework.boot:spring-boot-starter-aop'
```

Spring Boot 会提供 AOP 自动配置，通常不需要再手动添加 `@EnableAspectJAutoProxy`。

### 编写切面

```java
package com.example.demo.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class PerformanceAspect {

    private static final Logger log =
            LoggerFactory.getLogger(PerformanceAspect.class);

    @Around("execution(* com.example.demo.service..*(..))")
    public Object measureTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.nanoTime();

        try {
            return joinPoint.proceed();
        } finally {
            long elapsed = System.nanoTime() - start;
            double elapsedMillis = elapsed / 1_000_000.0;

            log.info("{}.{} 执行耗时：{} ms",
                    joinPoint.getSignature().getDeclaringTypeName(),
                    joinPoint.getSignature().getName(),
                    String.format("%.2f", elapsedMillis));
        }
    }
}
```

这段代码会拦截 `com.example.demo.service` 包及其子包中的所有方法。无论方法正常返回还是抛出异常，`finally` 中的耗时日志都会执行。

使用 `System.nanoTime()` 统计一段代码的耗时比 `System.currentTimeMillis()` 更合适，因为它是单调递增的时间源，不容易受到系统时钟调整的影响。

## 切点表达式怎么写

最常见的切点指示符是 `execution`，基本格式如下：

```text
execution(修饰符? 返回类型 包名.类名.方法名(参数) 异常?)
```

例如：

```java
execution(* com.example.demo.service..*(..))
```

逐段解释：

- 第一个 `*`：任意返回类型。
- `com.example.demo.service..`：该包及其所有子包。
- 第二个 `*`：任意类中的任意方法。
- `(..)`：任意数量、任意类型的参数。

常用写法如下：

```java
// 拦截 UserService 的所有方法
execution(* com.example.demo.service.UserService.*(..))

// 拦截所有以 find 开头的方法
execution(* com.example.demo.service..*.find*(..))

// 拦截第一个参数为 Long 的方法
execution(* com.example.demo.service..*.*(Long, ..))

// 拦截带有指定注解的方法
@annotation(com.example.demo.annotation.OperationLog)

// 拦截带有 @Service 注解的类
@within(org.springframework.stereotype.Service)

// 同时满足两个条件
execution(* com.example.demo.service..*(..))
    && @annotation(com.example.demo.annotation.OperationLog)
```

当表达式较长或会被多个通知复用时，可以使用 `@Pointcut` 单独定义：

```java
@Aspect
@Component
public class ServiceLogAspect {

    @Pointcut("execution(* com.example.demo.service..*(..))")
    public void serviceMethods() {
    }

    @Before("serviceMethods()")
    public void beforeServiceMethod() {
        // 前置处理
    }
}
```

`@Pointcut` 方法本身不需要业务代码，它只是为切点表达式提供一个可复用的名称。

## 更灵活的方式：自定义注解

按包名拦截适合覆盖整个分层，但有时我们只想增强少数方法。此时使用自定义注解会更清晰。

先定义注解：

```java
package com.example.demo.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface OperationLog {
    String value() default "";
}
```

在业务方法上使用：

```java
@OperationLog("创建订单")
public Order createOrder(CreateOrderRequest request) {
    return orderRepository.save(request.toEntity());
}
```

切面可以直接取得注解参数：

```java
@Around("@annotation(operationLog)")
public Object recordOperation(
        ProceedingJoinPoint joinPoint,
        OperationLog operationLog) throws Throwable {

    log.info("开始执行：{}", operationLog.value());

    try {
        Object result = joinPoint.proceed();
        log.info("执行成功：{}", operationLog.value());
        return result;
    } catch (Throwable ex) {
        log.error("执行失败：{}", operationLog.value(), ex);
        throw ex;
    }
}
```

这里捕获异常后必须继续抛出，否则调用方会误以为方法执行成功，也可能破坏原有的事务回滚和异常处理流程。

## 最常见的陷阱：同类内部调用

Spring AOP 基于代理，因此只有**经过代理对象的方法调用**才能触发通知。下面的代码看似合理，实际上 `createUser()` 内部调用 `validateUser()` 时不会再次经过代理：

```java
@Service
public class UserService {

    public void createUser(User user) {
        validateUser(user); // 等价于 this.validateUser(user)
    }

    @OperationLog("校验用户")
    public void validateUser(User user) {
        // 校验逻辑
    }
}
```

调用过程实际上是：

```text
外部调用 → UserService 代理 → createUser()
                              └→ this.validateUser() 直接调用目标对象
```

`validateUser()` 没有经过代理，所以它上面的 AOP 通知不会生效。`@Transactional`、`@Async` 等依赖代理的注解也经常遇到同类问题。

最推荐的解决方式是拆分职责，把被增强的方法移动到另一个 Spring Bean 中：

```java
@Service
public class UserValidator {

    @OperationLog("校验用户")
    public void validate(User user) {
        // 校验逻辑
    }
}

@Service
public class UserService {

    private final UserValidator userValidator;

    public UserService(UserValidator userValidator) {
        this.userValidator = userValidator;
    }

    public void createUser(User user) {
        userValidator.validate(user); // 经过 UserValidator 的代理
    }
}
```

也可以注入自身代理，或通过 `AopContext.currentProxy()` 调用，但它们会增加代码与 Spring AOP 的耦合，通常不如重新划分职责自然。

## 其他常见失效场景

除了自调用，还应检查以下问题：

### 对象不是 Spring Bean

```java
UserService service = new UserService();
```

手动 `new` 出来的对象没有经过 Spring 容器，自然也没有代理。应通过依赖注入获得 Bean。

### 切点没有匹配到方法

包名、类名、参数类型或注解位置写错，都会导致通知不执行。调试时可以先临时扩大切点范围，再逐步收紧。

### 方法不具备可代理条件

使用 CGLIB 时，`private`、`final` 方法无法被子类覆盖，因此不能按预期增强；`final` 类也不能生成子类代理。

### 环绕通知没有执行 `proceed()`

```java
@Around("serviceMethods()")
public Object around(ProceedingJoinPoint joinPoint) {
    log.info("before");
    return null; // 目标方法不会执行
}
```

除非有意中断调用，否则环绕通知必须执行并返回 `joinPoint.proceed()` 的结果。

### 异常被切面吞掉

如果捕获异常后直接返回，调用方和事务拦截器都可能无法感知失败。记录日志后通常应原样抛出异常。

## 多个切面的执行顺序

当同一个方法同时匹配多个切面时，可以使用 `@Order` 指定顺序：

```java
@Aspect
@Component
@Order(1)
public class SecurityAspect {
}

@Aspect
@Component
@Order(2)
public class LogAspect {
}
```

数值越小，切面优先级越高。对于环绕通知，可以把它理解为嵌套结构：优先级高的切面先进入、后退出。

```text
Security before
  Log before
    Target method
  Log after
Security after
```

切面之间如果存在强顺序依赖，往往会增加理解和维护成本。除了指定 `@Order`，还应尽量让每个切面保持职责单一。

## Spring AOP 与 AspectJ 的区别

虽然 Spring AOP 使用了 AspectJ 的注解和切点表达式风格，但两者并不等价。

| 对比项 | Spring AOP | AspectJ |
|-------|------------|---------|
| 实现方式 | 运行时动态代理 | 编译期或类加载期修改字节码 |
| 作用范围 | 主要是 Spring Bean 的方法执行 | 方法、构造器、字段访问等 |
| 使用成本 | 较低，与 Spring 集成自然 | 配置和构建过程更复杂 |
| 自调用 | 会绕过代理 | 字节码织入时不存在该代理问题 |
| 典型场景 | 事务、日志、权限、监控 | 需要完整连接点模型的底层增强 |

大多数 Spring 业务应用使用 Spring AOP 已经足够。只有当增强范围超出 Spring Bean 的方法调用时，才需要进一步考虑 AspectJ。

## 使用建议

- 切面适合处理与具体业务无关、可复用的横切逻辑。
- 不要在切面中堆积复杂业务判断，否则只是把耦合从 Service 转移到了切面。
- 切点范围应尽量明确，避免无意拦截大量方法。
- 日志中谨慎输出密码、令牌和个人信息等敏感数据。
- 环绕通知应正确保留返回值和异常语义。
- 对关键切面编写测试，确认正常返回、异常和边界情况都符合预期。
- 遇到注解不生效时，优先检查 Bean、代理、自调用和方法可见性。

## 总结

Spring AOP 的核心可以概括为一句话：**Spring 通过代理对象拦截符合切点的方法，并在指定时机执行切面逻辑。**

掌握 Spring AOP，需要重点理解以下内容：

1. AOP 用来抽离日志、事务、权限等横切关注点。
2. 切点决定拦截哪里，通知决定何时执行，切面承载具体逻辑。
3. Spring AOP 基于 JDK 动态代理或 CGLIB 代理。
4. `@Around` 功能最强，但必须正确调用 `proceed()` 并处理异常。
5. 同类内部调用会绕过代理，是最常见的失效原因。
6. Spring AOP 适合 Spring Bean 的方法级增强，更完整的织入能力应使用 AspectJ。

理解“调用是否经过代理”之后，Spring AOP、`@Transactional` 以及许多基于代理的 Spring 功能都会变得更容易掌握。

## 参考资料

- [Spring Framework：AOP Concepts](https://docs.spring.io/spring-framework/reference/core/aop/introduction-defn.html)
- [Spring Framework：Proxying Mechanisms](https://docs.spring.io/spring-framework/reference/core/aop/proxying.html)
- [Spring Framework：Spring AOP Capabilities and Goals](https://docs.spring.io/spring-framework/reference/core/aop/introduction-spring-defn.html)
- [Spring Boot：Aspect-Oriented Programming](https://docs.spring.io/spring-boot/reference/features/aop.html)
