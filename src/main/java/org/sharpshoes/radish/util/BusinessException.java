package org.sharpshoes.radish.util;

public class BusinessException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 937283169629824913L;

	public static final Integer ERROR_USER = 100;
	public static final Integer ERROR_INNER = 200;
	
	private Integer code = ERROR_USER;
	private String message;
	
	public BusinessException(Integer code, String message) {
		super(message);
		this.code = code;
		this.message = message;
	}

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
