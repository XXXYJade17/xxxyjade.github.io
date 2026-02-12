

**JDBC**（Java DataBase Connectivity）：使用 **Java** 语言操作关系型数据库的一套 **API**。

```xml
<!-- 使用依赖 -->
<dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <version>8.0.33</version>
</dependency>
```
***

注册驱动：

```java
Class.forName("com.mysql.cj.jdbc.Driver");
```

获取数据库连接：
```java
//数据库地址
String url="jdbc:mysql://localhost:3306/web";     
//数据库用户名
String username="root";
//密码
String password="xxxyjade17";
//创建连接对象
Connection connection=DriverManager.getConnection(url,username,password);
```

创建执行对象：
```java
//创建预执行对象
Statement statement=connection.createStatement();
```

执行并接受返回值
```java
//接收返回值
int i=statement.executeUpdate("update user set age = 30 where id = 1");
```

释放资源：
```java
statement.close();
connection.close();
```
***

使用示例：

1. 数据库配置：	

```java
String url="jdbc:mysql://localhost:3306/database_name";
String username="root";
String password="123456";
String sql="SELECT id,username,password,name,age from user where username=? and password=?";
```

2. 创建对象

```java
//连接对象
Connection connection = null;
//预编译对象
PreparedStatement stmt = null;
//查询返回的结果
ResultSet rs = null;  
```

3. 执行 SQL

```java
try{
    //创建驱动
    Class.forName("com.mysql.cj.jdbc.Driver");
    //获取连接
    connection=DriverManager.getConnection(url,username,password);
    //获取预编译对象
    stmt=connection.prepareStatement(sql);
    //赋值
    stmt.setString(1,"daqiao");
    stmt.setString(2,"123456");
    //执行操作
    rs=stmt.executeQuery();
    while(rs.next()){
        User user=new User(
            rs.getInt("id"),
            rs.getString("username"),
            rs.getString("password"),
            rs.getString("name"),
            rs.getInt("age")
        );
        System.out.println(user);
    }
} catch (ClassNotFoundException e) {
    throw new RuntimeException(e);
} catch (SQLException e) {
    throw new RuntimeException(e);
} finally {
    try{
        if(rs!=null)rs.close();
        if(stmt!=null)stmt.close();
        if(connection!=null)connection.close();
    } catch (SQLException e) {
        throw new RuntimeException(e);
    }
}
```
