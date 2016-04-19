-- MySQL dump 10.13  Distrib 5.6.14, for osx10.7 (x86_64)
--
-- Host: localhost    Database: sparkmorry
-- ------------------------------------------------------
-- Server version	5.6.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `article_article`
--

DROP TABLE IF EXISTS `article_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article_article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `content` longtext,
  `ctime` datetime NOT NULL,
  `utime` datetime NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_article`
--

LOCK TABLES `article_article` WRITE;
/*!40000 ALTER TABLE `article_article` DISABLE KEYS */;
INSERT INTO `article_article` VALUES (1,'回杭','<p>再一次坐上回杭州的火车，在火车上看到沈鹏创业的招人贴，盯着往后退的田野山河，回想毕业这一年多来在帝都和成都折腾的日子，感觉真的经历了好多事情。</p>\r\n\r\n<h3><strong>加入美团外卖</strong></h3>\r\n\r\n<p>毕业的时候经历过一段时间的迷茫期，看着大家纷纷读研出国留学，作为一个爱折腾少女又选择做了少数派去工作。寒假闭关学了一个月的前端就开始找工作了，当时已经过了10月份校招的黄金期，就在大街网上投了简历。大概14年那个时候正好是前端最紧缺的年代，收到了很多回复，有些创业公司甚至不要面试就把我拉去了。也是因为一些机缘巧合去tataufo实习，就顺便去了美团面试，在这之前我甚至都没有想过自己会去北京工作。虽然当时住在立水公寓一间简陋的宿舍里，但是那实习的一个多月时间第一次让我觉得工作可以这么有趣，连周末都期待着去公司。那时候外卖业务刚起步，本来是被招去做c端i版（微信端h5）的，但是那时商家端正好需要改ui，需要一个月左右的时间，我就被分配去商家端了。那是我第一次做一个完整工程的前端，当时的商家端只有4个rd，每天的订单量还只有7、8万，每天早上开晨会一起开玩笑，改版完的那天晚上因为公司网络的原因，上线碰到了一点问题，一直忙到了整个楼层只有我们pc端的3个rd和1个pm才走。那时候康哥还把那个版本命名成了morry版，我们一起拿纸画了&ldquo;庆祝美团外卖商家morry1.0版成功上线&rdquo;的几个字拍照留念。那个晚上是我第一次做为一个上大学之前甚至根本不知道编程为何物的妹纸体会到一个工程师的成就感。</p>\r\n\r\n<h3><strong>关于商业竞争</strong></h3>\r\n\r\n<p>那个时候外卖业务还很不成熟，记得最开始做为c端FE第一次开&ldquo;站会&rdquo;的时候刚进会议室就看到何老师坐在门口碎碎念道&ldquo;都是pm提的什么傻x需求&rdquo;，徐老师走过去默默跟他说&ldquo;应该给你面前放口碗&rdquo;，何老师回道&ldquo;死胖子走开&rdquo;，宋老板看到他们也偷笑。这样的场景到现在还记得，当时大家都纷纷吐槽&ldquo;外卖送的好慢&rdquo;，&ldquo;我们的界面好丑&rdquo;，宋老板问我对外卖有什么意见的时候我还说&ldquo;就不能做一些更实用的功能比如配送员现在在哪里&rdquo;这样的功能。这个问题在那一年美团外卖第一次生日的时候我得到了答案，也学到了在美团这样一个团队中最值得学习的做事方式。作为一个比饿了么晚开始3、4年做外卖，但用了不到一年的时间就和饿了么做到五五开，而当时并列的淘点点、百度外卖也慢慢退出竞争舞台了。老王总能在每个阶段找到最重点的事情。比如在大家纷纷吐槽界面丑的时候，老王说外卖作为一个020行业，线下体验是要优先于线上体验的；当央视暴出黑外卖大家问该怎么去约束这个市场的时候，老王说你只有在垄断了一个市场的时候才有能力去建立规范制约这个市场。美团是经历过千团大战并胜出的，也经历了当年各式各样外卖平台竞争的，在之后接触了大大小小几十个创业团队之后，才发现创业就是一个从竞争中胜出的过程，而胜出的过程需要每个环节的正确抉择和配合，有一个靠谱的团队是最重要的事情。</p>\r\n\r\n<h3><strong>那些年一起玩的小霸王</strong></h3>\r\n\r\n<p>因为会哥和老王招人的风格，团队里的每个人都各有特色，那是一个十分有爱的团队。所以在后来去绘事后素的时候我很无法忍受那种偏传统行业的沉闷的团队氛围。在美团另一个大收获就是遇见了猴哥，在我俩还是安稳的上班族的时候，每个周末一起去公园，或者去超市菜场买菜回来做饭，拉上周围的同事一起来家里玩海贼杀吵到邻居，可乐时不时来家里留宿讨论产品，徐老师带了小霸王一起打坦克大战，和东妹一起在小区楼下看月亮，每天期待着去公司见到他们的日子，都是最幸福的日子。鹏鹏是第一个离开团队的同事，他离开的那个晚上我哭的一把鼻涕一把泪的抹在猴哥身上，后来认识的人一个个离开，也新人再进来，只是团队大了之后再也没有那样的期待和感情了。不知道是不是所有人的第一份工作都是这样记忆深刻，只是我的第一份工作是让我想起来都会开心或者感动到哭的。</p>\r\n\r\n<h3><strong>自由职业</strong></h3>\r\n\r\n<p>因为承受不了这样的落差，并且被北京当时整个互联网创业氛围的感染，我当时什么也没想的就离职开始了自己这段自由也不自由的时光。因为同事的各种推荐，我</p>\r\n','2016-04-18 10:34:50','2016-04-18 12:37:07',0);
/*!40000 ALTER TABLE `article_article` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-04-19 12:02:43
