package com.njwangbo.controller;

import java.io.File;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.njwangbo.exception.SysException;
import com.njwangbo.pojo.Goods;
import com.njwangbo.pojo.GoodsCondition;
import com.njwangbo.pojo.GoodsJSON;
import com.njwangbo.pojo.ResJSON;
import com.njwangbo.pojo.SmallImg;
import com.njwangbo.pojo.User;
import com.njwangbo.service.GoodsService;
import com.njwangbo.service.SmallImgService;

@Controller
public class GoodsController {
	@Autowired
	private GoodsService goodsService;

	@Autowired
	private SmallImgService imgService;

	@RequestMapping("/queryAllGoods")
	@ResponseBody
	public GoodsJSON queryAll(HttpServletRequest request, HttpServletResponse resp) {
		// 权限验证
		String condition = request.getParameter("condition");
		String pageNumStr = request.getParameter("pageNum");
		String pageSizeStr = request.getParameter("pageSize");
		GoodsCondition conditions = new GoodsCondition();
		conditions.setCondition(condition);
		conditions.setPageNum(pageNumStr);
		conditions.setPageSize(pageSizeStr);
		List<Goods> rows = goodsService.queryAll(conditions);
		int total = goodsService.getTotal(conditions);
		GoodsJSON json = new GoodsJSON();
		json.setTotal(total);
		json.setRows(rows);
		return json;
	}

	@RequestMapping("/queryRealAllGoods")
	@ResponseBody
	public GoodsJSON queryRealAllGoods(HttpServletRequest request, HttpServletResponse resp) {
		// 权限验证
		String condition = request.getParameter("condition");
		GoodsCondition conditions = new GoodsCondition();
		conditions.setCondition(condition);
		List<Goods> rows;
		GoodsJSON json = new GoodsJSON();
		try {
			rows = goodsService.queryRealAll(conditions);
			int total = goodsService.getTotal(conditions);
			json.setTotal(total);
			json.setRows(rows);
		} catch (SysException e) {
			e.printStackTrace();
		}
		return json;
	}

	@RequestMapping("/addGoods")
	@ResponseBody
	public ResJSON addGoods(HttpServletRequest request, HttpServletResponse resp) {
		// 权限验证
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}
		String name = request.getParameter("name");
		String price = request.getParameter("price");
		String sales = request.getParameter("sales");
		String num = request.getParameter("num");
		String des = request.getParameter("des");
		String typeId = request.getParameter("typeId");
		String userId = user.getId();
		String allImgInfo = request.getParameter("allImgInfo");
		String[] imgs = allImgInfo.replace("[", "").replace("]", "").replaceAll(" ", "").split(",");
		List<SmallImg> smImgs = new ArrayList<SmallImg>();

		ResJSON json = new ResJSON();

		try {
			if (!name.matches("^[A-Za-z0-9\u4E00-\u9fa5\\-\\_，！ +（）,.]{2,200}$")) {
				throw new SysException("商品名只能包含2-200个中文，英文，数字，字母，下划线");
			}
			if (!price.matches("^[0-9\\.]{1,9}$")) {
				throw new SysException("价格只能包含1-9个数字，小数点");
			}
			if (!sales.matches("^[0-9]{1,12}$")) {
				throw new SysException("销量只能包含1-12个数字");
			}
			if (!num.matches("^[0-9]{1,12}$")) {
				throw new SysException("库存只能包含1-12个数字");
			}
			if (!des.matches("^[A-Za-z0-9\u4E00-\u9fa5\\-\\_，！ +（）,.]{2,200}$")) {
				throw new SysException("描述只能包含2-200个中文，英文，数字，字母，下划线");
			}
			Goods goods = new Goods(name, price, Integer.parseInt(num), Integer.parseInt(sales), des, userId, typeId, smImgs);
			String goodsId = goodsService.add(goods);
			for (int i = 0; i < imgs.length; i++) {
				SmallImg img = new SmallImg(imgs[i], goodsId);
				imgService.add(img);
			}
			json.setIsSuccess("true");
		} catch (SysException e) {
			json.setIsSuccess("false");
			json.setErrMsg(e.getMessage());
		}
		return json;
	}

	@RequestMapping("/updateGoods")
	@ResponseBody
	public ResJSON updateGoods(HttpServletRequest request, HttpServletResponse resp) {
		// 权限验证
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}
		String id = request.getParameter("id");
		String name = request.getParameter("name");
		String price = request.getParameter("price");
		String sales = request.getParameter("sales");
		String num = request.getParameter("num");
		String des = request.getParameter("des");
		String typeId = request.getParameter("typeId");
		String userId = user.getId();
		String allImgInfo = request.getParameter("allImgInfo");
		String[] imgs = allImgInfo.replace("[", "").replace("]", "").replaceAll(" ", "").split(",");
		List<SmallImg> smImgs = new ArrayList<SmallImg>();
		ResJSON json = new ResJSON();
		try {
			if (!name.matches("^[A-Za-z0-9\u4E00-\u9fa5\\-\\_，！ +（）,\\s. !]{2,200}$")) {
				throw new SysException("商品名只能包含2-200个中文，英文，数字，字母，下划线");
			}
			if (!price.matches("^[0-9\\.]{1,9}$")) {
				throw new SysException("价格只能包含1-9个数字，小数点");
			}
			if (!sales.matches("^[0-9]{1,12}$")) {
				throw new SysException("销量只能包含1-12个数字");
			}
			if (!num.matches("^[0-9]{1,12}$")) {
				throw new SysException("库存只能包含1-12个数字");
			}
			if (!des.matches("^[A-Za-z0-9\u4E00-\u9fa5\\-\\_，！ +（）,\\s. !]{2,200}$")) {
				throw new SysException("描述只能包含2-200个中文，英文，数字，字母，下划线");
			}
			Goods goods = new Goods(id, name, price, Integer.parseInt(num), Integer.parseInt(sales), des, userId, typeId, smImgs);
			goodsService.update(goods);
			imgService.delete(id);
			for (int i = 0; i < imgs.length; i++) {
				SmallImg img = new SmallImg(imgs[i], id);
				imgService.add(img);
			}
			json.setIsSuccess("true");
		} catch (SysException e) {
			json.setIsSuccess("false");
			json.setErrMsg(e.getMessage());
		}
		return json;
	}

	@RequestMapping("/deleteGoods")
	@ResponseBody
	public ResJSON deleteGoods(HttpServletRequest request, HttpServletResponse resp) {
		// 权限验证
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}
		String id = request.getParameter("id");
		ResJSON json = new ResJSON();
		try {
			goodsService.delete(id);
			imgService.delete(id);
			json.setIsSuccess("true");
		} catch (SysException e) {
			json.setIsSuccess("false");
			json.setErrMsg(e.getMessage());
		}
		return json;
	}

	@RequestMapping("/queryGoodsById")
	@ResponseBody
	public Goods queryGoodsById(HttpServletRequest request, HttpServletResponse resp) {
		String id = request.getParameter("id");
		Goods goods = null;
		try {
			goods = goodsService.queryById(id);
		} catch (SysException e) {
			e.printStackTrace();
		}
		return goods;
	}

	/**
	 * 文件上传
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/upload")
	public void upload(HttpServletRequest request, HttpServletResponse response) {
		// 判断是否为多部件
		if (ServletFileUpload.isMultipartContent(request)) {
			// 创建文件上传工厂
			FileItemFactory factory = new DiskFileItemFactory();
			// 通过工厂创建文件上传
			ServletFileUpload fileUpload = new ServletFileUpload(factory);

			List<String> fileList = new ArrayList<String>();
			try {
				PrintWriter out = response.getWriter();
				// 将请求转换为文件对象
				List<FileItem> fileItems = fileUpload.parseRequest(request);
				Iterator<FileItem> it = fileItems.iterator();
				// 迭代
				int count = 0;
				while (it.hasNext()) {
					// 获取文件名
					FileItem fileItem = it.next();
					String fileName = fileItem.getName();
					fileName = fileName.substring(fileName.lastIndexOf("."));
					fileName = System.currentTimeMillis() + count + fileName;
					// 将文件写入img文件夹中
					fileItem.write(new File("../webapps" + request.getContextPath() + "/img/" + fileName));
					fileList.add(fileName);
					count++;
				}
				String allImgInfo = Arrays.toString(fileList.toArray());
				out.print("<script>parent.postGoodsInfo('" + allImgInfo + "')</script>");
			} catch (FileUploadException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
}
