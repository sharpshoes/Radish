package org.sharpshoes.radish.rest;

public class RestResponse {

	public static final Integer CODE_SUCESS = 0;
	
	private Integer code = CODE_SUCESS;
	private String message = "";
	private Object data;
	
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
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
	
}
