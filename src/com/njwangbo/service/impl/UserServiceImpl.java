package com.njwangbo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.njwangbo.exception.SysException;
import com.njwangbo.mapper.UserMapper;
import com.njwangbo.pojo.GridCondition;
import com.njwangbo.pojo.User;
import com.njwangbo.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserMapper mapper;

	public User queryById(String id) throws SysException {
		User user = null;
		try {
			user = mapper.queryById(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return user;
	}

	public void regist(User user) throws SysException {
		try {
			User resUser = mapper.queryByLoginName(user.getLoginName());
			if (resUser == null)
				mapper.add(user);
			else
				throw new SysException("用户注册失败");
		} catch (Exception e) {
			throw new SysException("登录名已经存在");
		}
	}

	public void update(User user) throws SysException {
		if (Double.parseDouble(user.getMoney()) < 0) {
			throw new SysException("余额不足");
		}
		try {
			mapper.update(user);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("用户修改失败");
		}
	}

	public void delete(String id) throws SysException {
		try {
			mapper.delete(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public List<User> queryAll(GridCondition condition) throws SysException {
		List<User> users = null;
		try {
			users = mapper.queryAll(condition);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return users;
	}

	public int getTotal(GridCondition condition) throws SysException {
		int total = 0;
		try {
			total = mapper.getTotal(condition);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return total;
	}

	public User login(User user) throws SysException {
		User resUser = null;
		if (user.getLoginName().equals("") || user.getPwd().equals("")) {
			throw new SysException("登录名或密码不能为空");
		} else {
			try {
				resUser = mapper.queryByLoginNameAndPwd(user);
				if (resUser == null) {
					throw new SysException("用户名或密码错误");
				}
			} catch (Exception e) {
				throw new SysException("用户名或密码查询失败");
			}
		}
		return resUser;
	}
}
