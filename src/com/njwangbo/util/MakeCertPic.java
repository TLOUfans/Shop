package com.njwangbo.util;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Random;

import javax.imageio.ImageIO;

public class MakeCertPic {
	public static char[] charArray = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9' };

	public static String getCertPic(int width, int height, OutputStream os) {
		BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_BGR);
		Graphics g = image.getGraphics();
		g.setColor(new Color(0XFAFAFA));
		g.fillRect(0, 0, width, height);
		StringBuffer sb = new StringBuffer();
		Random random = new Random();
		for (int i = 0; i < 4; i++) {
			sb.append(charArray[random.nextInt(charArray.length)]);
		}
		g.setColor(Color.BLACK);
		g.setFont(new Font("Arial", Font.PLAIN, 22));
		g.drawString(sb.toString().substring(0, 1), 8, 27);
		g.drawString(sb.toString().substring(1, 2), 30, 22);
		g.drawString(sb.toString().substring(2, 3), 55, 30);
		g.drawString(sb.toString().substring(3, 4), 80, 35);

		for (int i = 0; i < 30; i++) {
			int x = random.nextInt(width);
			int y = random.nextInt(height);
			g.drawOval(x, y, 1, 1);
		}
		g.dispose();
		try {
			ImageIO.write(image, "JPEG", os);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return sb.toString();
	}

	public static void main(String[] args) throws FileNotFoundException {
		getCertPic(100, 40, new FileOutputStream(new File("E:/test.jpeg")));
	}
}
