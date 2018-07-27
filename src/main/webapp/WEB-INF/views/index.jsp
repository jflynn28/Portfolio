<%@ page contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Portfolio</title>
    <script>document.write('<base href="' + document.location + '" />');</script>
    <link rel="icon" href="data:,">
    <link href="<c:url value='/css/font-awesome-4.7.0/css/font-awesome.min.css' />" rel="stylesheet" type="text/css">
    <link href="<c:url value='/css/bootstrap.min.css' />" rel="stylesheet" type="text/css">
    <link href="<c:url value='/css/app.css' />" rel="stylesheet" type="text/css">
    <script src="<c:url value='/js/tether.min.js'  />" type="text/javascript"></script>
    <script src="<c:url value='/js/jquery-3.2.1.min.js'  />" type="text/javascript"></script>
    <script src="<c:url value='/js/bootstrap.min.js'  />" type="text/javascript"></script>
    <script src="<c:url value='/js/angular.min.js'  />" type="text/javascript"></script>
    <script src="<c:url value='/js/angular-route.min.js'  />" type="text/javascript"></script>
    <script src="<c:url value='/js/app.js' />" type="text/javascript"></script>
    <script src="<c:url value='/js/service/main_service.js' />" type="text/javascript"></script>
    <script src="<c:url value='/js/controller/main_controller.js' />" type="text/javascript"></script>
</head>

<body data-ng-app="myApp">
    <nav class="navigationMenu">
        <a class="homeIcon" href="/portfolio/#!/"><i class="fa fa-home"></i></a>
        <a class="navBtn" href="#!/info">Info</a>
        <a class="navBtn" href="#!/snake">Snake</a>
        <a class="navBtn" href="#!/encryption">Encryption</a>
        <a class="navBtn" href="#!/ecmt">ECMT</a>
    </nav>
    <div class="background" ng-controller="MainController as ctrl" ng-view></div>
</body>

</html>