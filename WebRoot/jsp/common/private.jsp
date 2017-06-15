<%@page import="com.njwangbo.pojo.User"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	Object obj = session.getAttribute("user");
	if(obj == null){
		out.print("<script>top.location.href='"+ basePath + "jsp/login.jsp" +"'</script>");
	} else {
		User user = (User)obj;
		if(user.getTag().equals("0")) {
			out.print("<script>top.location.href='"+ basePath + "jsp/typeList.jsp" +"'</script>");
		}
	}
%>