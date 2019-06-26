
Marjan Basiri, [Jun 26, 2019 at 9:56:59 AM]:

# ![](https://garaj24.net/Content/images/logos/logo-main.png) GARAJ(Provider) IOS Technical Specifications

**Last Edited At:** 06/24/2019

**Editors:** Marjan Basiri

  

# Table of Contents

* [App Introduction](#sec-introduction)

* [Technical Requirements](#sec-requirements)

* [Project Hierarchy](#sec-projectHierarchy)

* [Device Id](#sec-deviceId)

* [Location](#sec-Location)

* [Image Loading](#sec-imageLoading)

* [Push Notification](#sec-pushNotification)

* [Generic multi Section](#sec-genericMultiSection)

* [Custom RX Oprators](#sec-customRxOprators)

  

___

<a id="sec-introduction"></a>

## App Introduction

**GARAJ** aims to provide people the best Priced , qualified, nearest and fast Vehicle Services .  Instead of  going directly to repairs Shops,  without knowing the  service quality they provide or knowing is it the right price, you can find the best *repair Shop* or best  *vehicle agency* near you. You can also pay *GARAJ Providers* the way you want. We provide user two options : *cash* or in app payment, with help of *wallet* you can easily charge your account and use it when you need it.

Within the **Provider Version**, providers will be capable to create one or more business in the application, edit, activate or deactivate businesses. 
They also receive user's requests for each business separately. They could *invoicing* for each request, *reject*, *start* or *cancel* them. Providers also get *System Notifications* and *Messages* which all are send from **GARAJ Panel** ([http://garajpanel.tek-nic.com/](http://garajpanel.tek-nic.com/)).
  
___

<a id="sec-requirements"></a>

## Technical Requirements

  

|Id|Title|Description|
|---|-----|--------------|

|1 | Structural Architecture| MVVM

|2 | Database | -

|3 | Xcode | 10.1

|4 | Technologies | OOP, POP, DI, Generic

|5 | Theme and Components | Material

|6 | Development Language | Swift4, RXSwift

|7 | Authentication Protocol | OTP

|8 | Push Messaging | FCM

|9 | Crash Report | Firebase Crashlytics(Fabric)

|10 | Library Manager | CocoPods

|11 | RestFull API Manager | Moya

|12 | JSON Parser | ObjectMapper

___

<a id="sec-projectHierarchy"></a>

## Project Hierarchy


* Project

* Provider

* Errors

* Assets

* Classes

* Extensions

* Helpers

* Enums

* Services

* APIs

* Models

* NotificationEntities

* Entities

* SectionModels

* Generics

* ViewModel

* Auth

* Shared

* Pods

___

<a id="sec-deviceId"></a>

## Device Id

**UUID** has been used as Device Id .

___

<a id="sec-imageLoading"></a>

## Image Loading

using **PINRemoteImage** & **Kingfisher** library both, for future should remove **PINRemoteImage**.

  

___

<a id="sec-pushNotification"></a>

## Push notification

using **FCM** for receiving. using custom declared **NotificationManager** for handling.for  mapping Notification related to customer **requests** generated custom model named **ComboRequestUpdateNotify** that handles different structure of jsons. with help of **NotificationManager** you can handle notification with user touch and without touching.

___

<a id="sec-genericMultiSection"></a>

## Generic Multi Section

For UITableView & UICollectionView, used **RXDataSource** and for using multiSection we have two custom struct **SingleSectionGenericModel**  & **MultiSectionGenericEnumModel** , you can use them with any type of mappable.

___

<a id="sec-customRxOprators"></a>

## Custom RX Operators

Have two declared custom operators. first **Bind** replaced with ">>", second **AddDisposeableTo** replaced with  ~".
