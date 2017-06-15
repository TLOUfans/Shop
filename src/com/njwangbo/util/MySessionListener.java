package com.njwangbo.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import com.njwangbo.pojo.User;

public class MySessionListener implements HttpSessionListener {
	public static HashMap<String, User> activeUsers = new HashMap<String, User>();

	public void sessionCreated(HttpSessionEvent se) {

	}

	public void sessionDestroyed(HttpSessionEvent se) {
		User user = (User) se.getSession().getAttribute("user");
		if (user != null) {
			activeUsers.remove(user.getId());
		}
	}

	public static List<User> getActiveUsers() {
		List<User> list = new ArrayList<User>();
		Iterator<Entry<String, User>> iter = activeUsers.entrySet().iterator(); // 获得map的Iterator
		while (iter.hasNext()) {
			Entry<String, User> entry = iter.next();
			list.add(entry.getValue());
		}
		return list;
	}
}
