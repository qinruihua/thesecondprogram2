SET NAMES UTF8;
DROP DATABASE IF EXISTS cake;
CREATE DATABASE cake CHARSET=UTF8;
USE cake;


CREATE TABLE cake_item(
  fid INT PRIMARY KEY AUTO_INCREMENT,
  cake_pic VARCHAR(16),
  price VARCHAR(16),
  sugar VARCHAR(16),
  name VARCHAR(16)
  
);
CREATE TABLE cake_user(
	pid INT PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(32),
	passworld VARCHAR(32),
	phone VARCHAR(32)
);
CREATE TABLE cake_chart(
	nid INT PRIMARY KEY AUTO_INCREMENT,
	item_name VARCHAR(32),
	item_price VARCHAR(32),
	item_count INT(10),
	item_address VARCHAR(32),
	new_time VARCHAR(64),
	item_solor_price VARCHAR(32)
);

INSERT INTO cake_item VALUES
(NULL, 'img/香印青提蛋糕.jpg','￥138.00元','2','香印青提蛋糕'),
(NULL, 'img/芒果裸蛋糕.jpg','￥118.00元','3','芒果裸蛋糕'),
(NULL, 'img/芒果冰淇淋.jpg','￥198.00元','2','芒果冰淇淋'),
(NULL, 'img/百香果芝士千层.jpg','￥118.00元','2','百香果芝士千层'),
(NULL, 'img/新少女的祈祷.jpg','￥118.00元','2','1.5磅 新少女的祈祷');


INSERT INTO cake_user VALUES
(NULL, 'qinruihua1','111112','13438233182'),
(NULL, 'qinruihua2','111113','13438233182'),
(NULL, 'qinruihua3','111114','13438233182'),
(NULL, 'qinruihua4','111115','13438233182'),
(NULL, 'qinruihua5','111116','13438233182'),
(NULL, 'qinruihua6','111111','13438233182');