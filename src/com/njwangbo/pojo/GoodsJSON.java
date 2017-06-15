package com.njwangbo.pojo;

import java.util.List;


public class GoodsJSON {
	private int total;
	private List<Goods> rows;
	
	public GoodsJSON() {
	}

	public GoodsJSON(int total, List<Goods> rows) {
		this.total = total;
		this.rows = rows;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public List<Goods> getRows() {
		return rows;
	}

	public void setRows(List<Goods> rows) {
		this.rows = rows;
	}
	
	
}
