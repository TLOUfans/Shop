package com.njwangbo.service;

import com.njwangbo.exception.SysException;
import com.njwangbo.pojo.Address;

public interface AddressService {
	void add(Address address) throws SysException;
	
	void delete(String id) throws SysException;
	
	void update(Address address) throws SysException;
}
