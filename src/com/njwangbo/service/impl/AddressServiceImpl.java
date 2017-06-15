package com.njwangbo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.njwangbo.exception.SysException;
import com.njwangbo.mapper.AddressMapper;
import com.njwangbo.pojo.Address;
import com.njwangbo.service.AddressService;

@Service
public class AddressServiceImpl implements AddressService {
	@Autowired
	private AddressMapper mapper;
	public void add(Address address) throws SysException {
		try {
			mapper.add(address);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("添加地址失败");
		}
	}
	
	public void delete(String id) throws SysException {
		try {
			mapper.delete(id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("添加地址失败");
		}
	}
	
	public void update(Address address) throws SysException {
		try {
			mapper.update(address);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SysException("修改地址失败");
		}
	}
}
