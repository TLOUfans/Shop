package com.njwangbo.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.njwangbo.exception.SysException;
import com.njwangbo.pojo.Comment;
import com.njwangbo.pojo.CommentImg;
import com.njwangbo.pojo.Goods;
import com.njwangbo.pojo.GridCondition;
import com.njwangbo.pojo.GridJSON;
import com.njwangbo.pojo.ResJSON;
import com.njwangbo.pojo.User;
import com.njwangbo.service.CommentImgService;
import com.njwangbo.service.CommentService;

@Controller
public class CommentController {
	@Autowired
	private CommentService commentService;
	@Autowired
	private CommentImgService commentImgService;

	@RequestMapping("/queryCommentByPage")
	@ResponseBody
	public GridJSON queryCommentByPage(HttpServletRequest request, HttpServletResponse response) {
		// 前台ajax发送过来的参数
		String condition = request.getParameter("condition");
		String pageNumStr = request.getParameter("pageNum");
		String pageSizeStr = request.getParameter("pageSize");
		// 表格查询条件
		GridCondition conditions = new GridCondition();
		conditions.setCondition(condition);
		conditions.setPageNo(pageNumStr);
		conditions.setPageSize(pageSizeStr);
		GridJSON json = new GridJSON();
		try {
			List<Comment> rows = commentService.queryByPage(conditions);
			int total = commentService.quertAllCount(conditions);
			json.setRows(rows);
			json.setTotal(total);
		} catch (SysException e) {
			e.printStackTrace();
		}
		return json;
	}

	@RequestMapping("/deleteComment")
	@ResponseBody
	public ResJSON deleteComment(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 权限验证
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}
		String id = request.getParameter("id");
		ResJSON json = new ResJSON();
		try {
			commentService.delete(id);
			json.setIsSuccess("true");
		} catch (Exception e) {
			json.setIsSuccess("false");
			json.setErrMsg(e.getMessage());
		}
		return json;
	}

	@RequestMapping("/addComment")
	@ResponseBody
	public ResJSON addComment(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 权限验证
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}
		String content = request.getParameter("content");
		String grade = request.getParameter("grade");
		String goodsId = request.getParameter("goodsId");
		String allImgInfo = request.getParameter("allImgInfo");
		String[] allImgInfoArr = allImgInfo.split(",");
		Comment comment = new Comment();
		comment.setContent(content);
		comment.setGrade(grade);
		comment.setUser(user);
		Goods goods = new Goods();
		goods.setId(goodsId);
		comment.setGoods(goods);
		ResJSON json = new ResJSON();
		try {
			String commentId = commentService.add(comment);
			if(!allImgInfo.equals("")) {
				for (int i = 0; i < allImgInfoArr.length; i++) {
					commentImgService.add(new CommentImg(allImgInfoArr[i], commentId));
				}
			}
			json.setIsSuccess("true");
		} catch (Exception e) {
			json.setIsSuccess("false");
			json.setErrMsg(e.getMessage());
		}
		return json;
	}
}
