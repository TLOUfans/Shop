package com.njwangbo.mapper;

import com.njwangbo.pojo.Address;

public interface AddressMapper {
	void add(Address address) throws Exception;
	
	void delete(String id) throws Exception;
	
	void update(Address address) throws Exception;
}
