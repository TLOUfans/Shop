package com.njwangbo.util;

import java.text.NumberFormat;

public class Formatter {
	public static String toDoubleStr(double number){
		NumberFormat nf = NumberFormat.getInstance();
		nf.setGroupingUsed(false);
		return nf.format(number);
	}
}
