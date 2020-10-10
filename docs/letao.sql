-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2019-08-25 15:23:37
-- 服务器版本： 8.0.12
-- PHP 版本： 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

SET NAMES utf8 ;
DROP DATABASE IF EXISTS letao;
CREATE DATABASE letao CHARSET=utf8;
USE letao;
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `letao`
--

-- --------------------------------------------------------

--
-- 表的结构 `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `addressDetail` varchar(200) DEFAULT NULL,
  `isDelete` int(4) DEFAULT NULL,
  `recipients` varchar(100) DEFAULT NULL,
  `postCode` varchar(100) DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `address`
--

INSERT INTO `address` (`id`, `userId`, `address`, `addressDetail`, `isDelete`, `recipients`, `postCode`, `mobile`) VALUES
(1, 1, '山西省太原市小店区', '解放东路传智播客科技集团14层1402室', 1, '周双大', '666666', NULL),
(15, 1, '北京市 北京市 东城区', '123', 0, '456', '551120', NULL),
(16, 1, '北京市 北京市 东城区', '66', 1, '123', '666666', NULL),
(17, 1, '北京市 北京市 东城区', '111111', 1, '454', '111111', NULL),
(18, 1, '北京市 北京市 东城区', '111111', 1, '111111', '111111', NULL),
(19, 1, '北京市 北京市 西城区', '111111111111', 0, '111111', '111111', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `brand`
--

CREATE TABLE `brand` (
  `id` int(11) NOT NULL,
  `brandName` varchar(50) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `brandLogo` varchar(200) DEFAULT NULL,
  `isDelete` int(4) DEFAULT NULL,
  `hot` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `brand`
--

INSERT INTO `brand` (`id`, `brandName`, `categoryId`, `brandLogo`, `isDelete`, `hot`) VALUES
(1, '耐克', 1, '/mobile/images/brand1.png', 1, 1),
(2, '阿迪', 1, '/mobile/images/brand2.png', 1, 1),
(3, '新百伦', 1, '/mobile/images/brand3.png', 1, 1),
(4, '哥伦比亚', 1, '/mobile/images/brand4.png', 1, 0),
(5, '匡威', 1, '/mobile/images/brand5.png', 1, 1),
(6, '阿萨德1', 2, '/mobile/images/brand5.png', 1, 1),
(7, '骆驼', 2, '/mobile/images/brand5.png', 1, 1),
(8, '特步', 5, '/mobile/images/brand5.png', 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `num` int(20) DEFAULT NULL,
  `size` varchar(20) DEFAULT NULL,
  `isDelete` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `cart`
--

INSERT INTO `cart` (`id`, `userId`, `productId`, `num`, `size`, `isDelete`) VALUES
(1, 1, 1, 2, '50', 0),
(2, 1, 2, 18, '37', 1),
(3, 1, 3, 4, '40', 0),
(5, 1, 1, 1, '43', 1),
(6, 1, 2, 3, '38', 1),
(7, 1, 3, 1, '30', 1),
(8, 1, 1, 1, '42', 1),
(9, 1, 2, 3, '43', 1),
(10, 1, 1, 2, '48', 1),
(11, 1, 3, 1, '44', 1),
(12, 1, 3, 4, '33', 1),
(13, 1, 3, 6, '31', 1),
(14, 1, 2, 4, '38', 1),
(15, 1, 1, 2, '41', 1),
(16, 1, 3, 4, '33', 1),
(17, 1, 6, 7, '39', 1),
(18, 1, 6, 1, '50', 1),
(19, 1, 5, 1, '43', 1),
(20, 1, 5, 2, '43', 1),
(21, 1, 5, 1, '43', 1),
(22, 1, 5, 1, '40', 1),
(23, 7, 1, 1, '44', 1),
(24, 7, 2, 1, '38', 1),
(25, 7, 3, 3, '44', 1),
(26, 7, 6, 5, '39', 1),
(27, 7, 5, 1, '42', 1),
(28, 7, 4, 1, '43', 1),
(29, 7, 4, 3, '41', 1),
(30, 7, 6, 1, '36', 1),
(31, 1, 1, 1, '44', 1);

-- --------------------------------------------------------

--
-- 表的结构 `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `categoryName` varchar(50) DEFAULT NULL,
  `isDelete` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `category`
--

INSERT INTO `category` (`id`, `categoryName`, `isDelete`) VALUES
(1, '运动馆', 1),
(2, '女士馆', 1),
(3, '男士馆', 1),
(4, '帆布馆', 1),
(5, '户外馆', 1),
(6, '游泳馆', 1),
(7, '生活馆', 1);

-- --------------------------------------------------------

--
-- 表的结构 `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `mobile` char(11) DEFAULT NULL,
  `authority` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `employee`
--

INSERT INTO `employee` (`id`, `username`, `password`, `mobile`, `authority`) VALUES
(1, 'root', '4QrcOUm6Wau+VuBX8g+IPg==', '13902060052', 1);

-- --------------------------------------------------------

--
-- 表的结构 `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `proName` varchar(200) DEFAULT NULL COMMENT '商品名称',
  `oldPrice` float DEFAULT NULL COMMENT '商品价格',
  `price` float DEFAULT NULL COMMENT '商品折扣价',
  `proDesc` varchar(500) DEFAULT NULL COMMENT '商品描述',
  `size` varchar(20) DEFAULT NULL COMMENT '商品尺寸',
  `statu` int(4) DEFAULT NULL COMMENT '是否下架',
  `updateTime` datetime DEFAULT NULL COMMENT '上下架时间',
  `num` int(20) DEFAULT NULL COMMENT '商品库存',
  `brandId` int(11) DEFAULT NULL COMMENT '归属品牌'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `product`
--

INSERT INTO `product` (`id`, `proName`, `oldPrice`, `price`, `proDesc`, `size`, `statu`, `updateTime`, `num`, `brandId`) VALUES
(1, '匡威三星标1970s converse复刻 142334c 144757c三星标黑色高帮', 360, 250, '描述', '40-50', 1, '2017-01-05 00:28:29', 10, 1),
(2, '李宁闪击篮球鞋驭帅10镭射队尚4男韦德之道空袭中高帮队尚3.5球鞋', 888.1, 499.1, '描述', '35-45', 1, '2017-01-05 00:28:29', 20, 2),
(3, 'Sport飓风 Nike Kwazi 休闲运动鞋男 844839-002-001-100-400', 1200, 687, '描述', '30-50', 1, '2017-01-05 00:28:29', 30, 3),
(4, '指南针运动 NIKE HYPERSHIFT篮球鞋 844392-010-607-164-017现货', 1000, 500, '描述', '40-55', 1, '2017-01-05 00:28:29', 15, 4),
(5, '【莹恋】MIZUNO美津浓V1GA159002乒乓球鞋男鞋女鞋室内综合训练鞋', 8868.1, 4969.1, '描述123123', '40-50', 1, '2017-01-05 00:48:05', 22, 5),
(6, '【莹恋】MIZUNO美津浓V1GA159002乒乓球鞋男鞋女鞋室内综合训练鞋', 342, 112, '描述123123', '35-56', 1, '2017-01-05 00:48:05', 44, 1),
(17, '2', 3, 3, '3', '3', 1, '2019-07-02 14:54:53', 3, 8);

-- --------------------------------------------------------

--
-- 表的结构 `product_picture`
--

CREATE TABLE `product_picture` (
  `id` int(11) NOT NULL,
  `picName` varchar(40) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `picAddr` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `product_picture`
--

INSERT INTO `product_picture` (`id`, `picName`, `productId`, `picAddr`) VALUES
(1, 'product.jpg', 1, '/mobile/images/product.jpg'),
(2, 'detail.jpg', 2, '/mobile/images/detail.jpg'),
(3, 'detail.jpg', 3, '/mobile/images/detail.jpg'),
(4, '/mobile/images/detail.jpg', 4, '/mobile/images/detail.jpg'),
(5, '/mobile/images/detail.jpg', 5, '/mobile/images/detail.jpg'),
(6, '/mobile/images/detail.jpg', 6, '/mobile/images/detail.jpg'),
(7, '/mobile/images/detail.jpg', 1, '/mobile/images/detail.jpg'),
(8, '6928b6e0-9a83-11e9-bde2-af40cabe870b.png', 7, '/upload/product/6928b6e0-9a83-11e9-bde2-af40cabe870b.png'),
(9, '65961a40-9a83-11e9-bde2-af40cabe870b.png', 7, '/upload/product/65961a40-9a83-11e9-bde2-af40cabe870b.png'),
(10, '6c355aa0-9a83-11e9-bde2-af40cabe870b.png', 7, '/upload/product/6c355aa0-9a83-11e9-bde2-af40cabe870b.png'),
(11, '11d09bd0-9a86-11e9-bde2-af40cabe870b.jpg', 8, '/upload/product/11d09bd0-9a86-11e9-bde2-af40cabe870b.jpg'),
(12, '1187d300-9a86-11e9-bde2-af40cabe870b.jpg', 8, '/upload/product/1187d300-9a86-11e9-bde2-af40cabe870b.jpg'),
(13, '11cd8e90-9a86-11e9-bde2-af40cabe870b.jpg', 8, '/upload/product/11cd8e90-9a86-11e9-bde2-af40cabe870b.jpg'),
(14, '778351d0-9a8a-11e9-a3f4-b584a5756f89.jpg', 9, '/upload/product/778351d0-9a8a-11e9-a3f4-b584a5756f89.jpg'),
(15, '77760b60-9a8a-11e9-a3f4-b584a5756f89.jpg', 9, '/upload/product/77760b60-9a8a-11e9-a3f4-b584a5756f89.jpg'),
(16, '77843c30-9a8a-11e9-a3f4-b584a5756f89.jpg', 9, '/upload/product/77843c30-9a8a-11e9-a3f4-b584a5756f89.jpg'),
(17, '49729fd0-9af3-11e9-b299-417fbb6a69a0.jpg', 10, '/upload/product/49729fd0-9af3-11e9-b299-417fbb6a69a0.jpg'),
(18, '4974c2b0-9af3-11e9-b299-417fbb6a69a0.jpg', 10, '/upload/product/4974c2b0-9af3-11e9-b299-417fbb6a69a0.jpg'),
(19, '49769770-9af3-11e9-b299-417fbb6a69a0.jpg', 10, '/upload/product/49769770-9af3-11e9-b299-417fbb6a69a0.jpg'),
(20, 'ad59c0c0-9afb-11e9-9fb2-29da3abdfd7b.jpg', 11, '/upload/product/ad59c0c0-9afb-11e9-9fb2-29da3abdfd7b.jpg'),
(21, 'ad581310-9afb-11e9-9fb2-29da3abdfd7b.jpg', 11, '/upload/product/ad581310-9afb-11e9-9fb2-29da3abdfd7b.jpg'),
(22, 'ad5aab20-9afb-11e9-9fb2-29da3abdfd7b.jpg', 11, '/upload/product/ad5aab20-9afb-11e9-9fb2-29da3abdfd7b.jpg'),
(23, 'c376a700-9afc-11e9-9fb2-29da3abdfd7b.jpg', 12, '/upload/product/c376a700-9afc-11e9-9fb2-29da3abdfd7b.jpg'),
(24, 'c373c0d0-9afc-11e9-9fb2-29da3abdfd7b.jpg', 12, '/upload/product/c373c0d0-9afc-11e9-9fb2-29da3abdfd7b.jpg'),
(25, 'c374ab30-9afc-11e9-9fb2-29da3abdfd7b.jpg', 12, '/upload/product/c374ab30-9afc-11e9-9fb2-29da3abdfd7b.jpg'),
(26, 'd042b6e0-9afc-11e9-9fb2-29da3abdfd7b.jpg', 13, '/upload/product/d042b6e0-9afc-11e9-9fb2-29da3abdfd7b.jpg'),
(27, 'd03e2300-9afc-11e9-9fb2-29da3abdfd7b.jpg', 13, '/upload/product/d03e2300-9afc-11e9-9fb2-29da3abdfd7b.jpg'),
(28, 'd040e220-9afc-11e9-9fb2-29da3abdfd7b.jpg', 13, '/upload/product/d040e220-9afc-11e9-9fb2-29da3abdfd7b.jpg'),
(29, 'd03e2300-9afc-11e9-9fb2-29da3abdfd7b.jpg', 14, '/upload/product/d03e2300-9afc-11e9-9fb2-29da3abdfd7b.jpg'),
(30, 'd040e220-9afc-11e9-9fb2-29da3abdfd7b.jpg', 14, '/upload/product/d040e220-9afc-11e9-9fb2-29da3abdfd7b.jpg'),
(31, 'd042b6e0-9afc-11e9-9fb2-29da3abdfd7b.jpg', 14, '/upload/product/d042b6e0-9afc-11e9-9fb2-29da3abdfd7b.jpg'),
(32, 'd03e2300-9afc-11e9-9fb2-29da3abdfd7b.jpg', 15, '/upload/product/d03e2300-9afc-11e9-9fb2-29da3abdfd7b.jpg'),
(33, 'd040e220-9afc-11e9-9fb2-29da3abdfd7b.jpg', 15, '/upload/product/d040e220-9afc-11e9-9fb2-29da3abdfd7b.jpg'),
(34, 'd042b6e0-9afc-11e9-9fb2-29da3abdfd7b.jpg', 15, '/upload/product/d042b6e0-9afc-11e9-9fb2-29da3abdfd7b.jpg'),
(35, 'd03e2300-9afc-11e9-9fb2-29da3abdfd7b.jpg', 16, '/upload/product/d03e2300-9afc-11e9-9fb2-29da3abdfd7b.jpg'),
(36, 'd040e220-9afc-11e9-9fb2-29da3abdfd7b.jpg', 16, '/upload/product/d040e220-9afc-11e9-9fb2-29da3abdfd7b.jpg'),
(37, 'd042b6e0-9afc-11e9-9fb2-29da3abdfd7b.jpg', 16, '/upload/product/d042b6e0-9afc-11e9-9fb2-29da3abdfd7b.jpg'),
(38, '4ac03a10-9c96-11e9-a8c0-bf1a9d57b4af.jpg', 17, '/upload/product/4ac03a10-9c96-11e9-a8c0-bf1a9d57b4af.jpg'),
(39, '4abe8c60-9c96-11e9-a8c0-bf1a9d57b4af.jpg', 17, '/upload/product/4abe8c60-9c96-11e9-a8c0-bf1a9d57b4af.jpg'),
(40, '4ac4f500-9c96-11e9-a8c0-bf1a9d57b4af.jpg', 17, '/upload/product/4ac4f500-9c96-11e9-a8c0-bf1a9d57b4af.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `mobile` char(11) DEFAULT NULL,
  `isDelete` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `mobile`, `isDelete`) VALUES
(1, 'admin', '4QrcOUm6Wau+VuBX8g+IPg==', '15102324243', 1),
(7, '13510741074', '4QrcOUm6Wau+VuBX8g+IPg==', '13510751074', 1),
(8, '15115523302', '4QrcOUm6Wau+VuBX8g+IPg==', '15115523302', 1);

--
-- 转储表的索引
--

--
-- 表的索引 `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `product_picture`
--
ALTER TABLE `product_picture`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- 使用表AUTO_INCREMENT `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- 使用表AUTO_INCREMENT `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- 使用表AUTO_INCREMENT `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 使用表AUTO_INCREMENT `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- 使用表AUTO_INCREMENT `product_picture`
--
ALTER TABLE `product_picture`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
