package com.njwangbo.test;

import java.text.NumberFormat;

public class Test {
	public static void main(String[] args) {
		NumberFormat format = NumberFormat.getInstance();
		format.setGroupingUsed(false);
		System.out.println(format.format(Double.parseDouble("100000000")- 19.9));
	}
}
