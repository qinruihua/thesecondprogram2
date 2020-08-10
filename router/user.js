const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//console.log(pool);
//创建路由器对象
const router=express.Router();
//往路由器对象添加路由
//1.用户注册路由  post  /reg
router.post('/reg',(req,res)=>{
  //1.1获取post传递的数据
  let obj=req.body;
  
  //1.2检测各项数据是否为空
  if(!obj.username){
    res.send({code:401,msg:'username required'});
	return; //阻止往后执行
  }
  if(!obj.passworld){
    res.send({code:402,msg:'passworld required'});
	return;
  }
  
  if(!obj.phone){
    res.send({code:404,msg:'phone required'});
	return;
  }
  //1.3执行SQL语句
  pool.query('SELECT * FROM cake_user WHERE username=?',[obj.username],(err,result)=>{
	  if(err) throw err;
	  if(result.length>0){
		  console.log('银行',result.length);
      res.send('1');
		return;
    }
    else{
      pool.query('INSERT INTO cake_user SET ?',[obj],(err,result)=>{
        if(err) throw err;
        console.log("22222");
        res.send("0");
    }); 
      
      return;
    }
    
  })
  console.log(2222)
  
});
//2.用户登录路由 post  /login
router.post('/login',(req,res)=>{
  //2.1获取post传递数据
  let obj=req.body;
  console.log(obj);
  //2.2检测数据是否为空
  if(!obj.username){
    res.send({code:401,msg:'uname required'});
	return;
  }
  if(!obj.passworld){
    res.send({code:402,msg:'upwd required'});
	return;
  }
  //2.3执行SQL语句
  pool.query('SELECT * FROM cake_user WHERE username=? AND passworld=?',[obj.username,obj.passworld],(err,result)=>{
    if(err) throw err;
	console.log(result);
	//返回的是数组，如果数组长度为0说明登录失败，否则登录成功
	if(result.length===0){
	  res.send("0");
	}else{
	  res.send("1");
	}
  });
});
//3.修改用户资料 post  /update
router.post('/update',(req,res)=>{
  //3.1获取post传递的数据
  let obj=req.body;
 
  //3.3执行SQL语句
  //修改成功，响应200，失败响应301
  pool.query('INSERT INTO cake_user VALUES?',[obj],(err,result)=>{
    if(err) throw err;
	console.log(111);
	//result为对象
	//如果result下的affectedRows为0，修改失败；否则修改成功
	if(result.affectedRows===0){
	  res.send({code:301,msg:'update err'});
	}else{
	  res.send({code:200,msg:'update suc'});
	}
  });
});
//4.用户列表  get  /list
router.get('/list',(req,res)=>{
  //4.1获取查询字符串传递的数据
  let obj=req.query;
  //4.2如果值为空设置默认值
  //如果页码为空，默认值为1
  if(!obj.pno) obj.pno=1;
  //如果每页大小为空，设置默认值为5
  if(!obj.count) obj.count=5;
  console.log(obj);
  //4.3计算开始查询的值
  let start=(obj.pno-1)*obj.count;
  //4.4把每页大小转为数值型
  let size=parseInt(obj.count);
  //4.5执行SQL语句
  pool.query('SELECT * FROM xz_user LIMIT ?,?',[start,size],(err,result)=>{
    if(err) throw err;
	console.log(result);
	//把查询的数据直接响应给浏览器
    res.send(result);
  });
});
//5.检索用户  get  /detail
router.get('/detail',(req,res)=>{
  //5.1获取查询字符串数据
  let obj=req.query;
  console.log('book:',obj);
  //5.2检测数据是否为空
  if(!obj.fid){
    console.log(obj.fid);
    res.send({code:401,msg:'fid requried'});
	return;
  }
  //5.3执行SQL语句，查询编号对应的数据，并响应数据到浏览器端
  pool.query('SELECT * FROM cake_item',(err,result)=>{
    if(err) throw err;
	res.send(result);
  });
});
router.get('/select',(req,res)=>{
  console.log('test1',2)
  let obj=req.query;
  console.log(obj.fid);
  let sql='SELECT COUNT(fid) AS count FROM cake_item';
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    console.log(obj['fid'])
    let fid=parseInt(obj['fid']);
    
   
    let pagesize=(fid-1)*4;
   
    console.log(pagesize);
    sql='SELECT cake_pic,price,sugar,name FROM cake_item LIMIT ?,4'
    pool.query(sql,[pagesize],(err,results)=>{
      if(err) throw err;
      res.send({results:results,result:result,pid:fid})
    })
    
  });
});
router.get('/chart',(req,res)=>{
  let obj=req.query;
  console.log(obj);
let time=obj.test[2];
  let name=obj.test[1];
  let price=obj.test[0]
  let count=1;
  let sql='INSERT INTO cake_chart (item_name,item_price,item_count,item_address,new_time,item_solor_price,item_weight) VALUES (?,?,?,?,?,?,?)';
  console.log(obj.test)
  pool.query(sql,[obj.test[1],obj.test[0],count,obj.test[3],obj.test[4],obj.test[0],obj.test[5]],(err,results)=>{
    if(err) throw err;
    res.send({code:obj})
  })

})
router.get('/getChart',(req,res)=>{
  let obj=req.query;
  console.log(obj)
  let sql='SELECT * FROM cake_chart';
  pool.query(sql,(err,results)=>{
    if(err) throw err;
    console.log(results)
    res.send(results)
  })
})
router.get('/delete',(req,res)=>{
  let obj=req.query;
  console.log(obj);
  let sql='DELETE FROM cake_chart WHERE item_name=? AND nid=?';
  pool.query(sql,[obj.fid,obj.fid1],(req,res)=>{

  })
})
router.get('/deleteall',(req,res)=>{
  
  let sql='DELETE FROM cake_chart';
  pool.query(sql,(req,res)=>{
    
  })
})
//路由器对象导出
module.exports=router;