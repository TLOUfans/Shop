package com.njwangbo.controller;

import java.io.File;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.njwangbo.exception.SysException;
import com.njwangbo.pojo.FileLists;
import com.njwangbo.pojo.GridCondition;
import com.njwangbo.pojo.GridJSON;
import com.njwangbo.pojo.ResJSON;
import com.njwangbo.pojo.User;
import com.njwangbo.service.FileListsService;

@Controller
public class FileListsController {
	@Autowired
	private FileListsService fileListsService;

	@RequestMapping("/getFilesByPage")
	@ResponseBody
	public GridJSON queryAllFilesByPage(HttpServletRequest request, HttpServletResponse response) throws SysException {
		// 权限验证
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			return new GridJSON();
		}

		String condition = request.getParameter("condition");
		String pageNumStr = request.getParameter("pageNum");
		String pageSizeStr = request.getParameter("pageSize");

		GridCondition conditions = new GridCondition();
		conditions.setCondition(condition);
		conditions.setPageNo(pageNumStr);
		conditions.setPageSize(pageSizeStr);

		List<FileLists> rows = fileListsService.queryAllFilesByPage(conditions);
		int total = fileListsService.queryAllCount(conditions);

		GridJSON json = new GridJSON();
		json.setTotal(total);
		json.setRows(rows);
		return json;
	}

	@RequestMapping("/addFile")
	@ResponseBody
	public ResJSON insert(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 权限验证
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}

		String fileName = request.getParameter("fileName");
		String fileSize = request.getParameter("fileSize");
		String fileType = request.getParameter("fileType");
		String userId = user.getId();

		ResJSON json = new ResJSON();
		try {
			fileListsService.insert(new FileLists(userId, fileName, fileSize, fileType));
			json.setIsSuccess("true");
		} catch (SysException e) {
			json.setIsSuccess("false");
			json.setErrMsg(e.getMessage());
		}
		return json;
	}

	@RequestMapping("/updateFileName")
	@ResponseBody
	public ResJSON update(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 权限验证
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}

		String id = request.getParameter("id");
		String fileName = request.getParameter("fileName");
		String oldFileName = fileListsService.queryByFileId(id);

		File file = new File("../webapps" + request.getContextPath() + "/disk/"+user.getLoginName()+"/" + oldFileName);
		file.renameTo(new File("../webapps" + request.getContextPath() + "/disk/"+user.getLoginName()+"/" + fileName));
		ResJSON json = new ResJSON();
		try {
			fileListsService.update(new FileLists(id, fileName));
			json.setIsSuccess("true");
		} catch (SysException e) {
			json.setIsSuccess("false");
			json.setErrMsg(e.getMessage());
		}
		return json;
	}

	@RequestMapping("/deleteFile")
	@ResponseBody
	public ResJSON delete(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 权限验证
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		if (user == null) {
			return new ResJSON();
		}
		String[] id = request.getParameter("id").split(",");
		String[] fileName = request.getParameter("fileName").split(",");
		
		
		ResJSON json = new ResJSON();
		try {
			for (int i = 0; i < id.length; i++) {
				fileListsService.delete(id[i]);
				File file = new File("../webapps" + request.getContextPath() + "/disk/"+user.getLoginName()+"/" + fileName[i]);
				file.delete();
			}
			json.setIsSuccess("true");
		} catch (SysException e) {
			json.setIsSuccess("false");
			json.setErrMsg(e.getMessage());
		}
		return json;
	}

	/**
	 * 上传文件
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/uploadByDisk")
	public void upload(HttpServletRequest request, HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=utf-8");
		// 权限验证
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		if (user == null) {
			return;
		}
		PrintWriter out = response.getWriter();
		// 如果前端提交的数据是multipart
		if (ServletFileUpload.isMultipartContent(request)) {
			// 文件工厂
			FileItemFactory factory = new DiskFileItemFactory();
			// 根据文件工厂，实例化文件上传类，该类时官方提供，专门在servlet中接收文件上传的类
			ServletFileUpload fileUpload = new ServletFileUpload(factory);
			// 把前端请求中的文件存放到集合中
			List<FileItem> items = fileUpload.parseRequest(request);
			// 获取上传的文件
			FileItem item = items.get(0);
			// 获取上传的文件名
			String fileName = item.getName();
			//fileName = StringEscapeUtils.escapeJava(fileName);
			// 获取文件大小
			long fileSize = item.getSize();
			// 获取文件的后缀名
			String fileType = fileName.substring(fileName.lastIndexOf("."));
			//创建文件夹
			String foldername = user.getLoginName();
			File folder = new File("../webapps/" + request.getContextPath()+"/disk/" + foldername);			
			if  (!folder .exists()  && !folder .isDirectory())      
			{       
			    folder.mkdir();    
			} else   
			{  
			    System.out.println("//目录存在");  
			}  
			// 把文件写入到项目中webroot下的disk文件夹
			item.write(new File( folder+"/" + fileName));

			String allImgFileNameStr = fileName + "," + fileSize + "," + fileType;
			out.print("<script>parent.postGoodsInfo('" + allImgFileNameStr + "')</script>");
		}
	}
}
