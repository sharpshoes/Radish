package org.sharpshoes.radish.entity;

@Table(name="t_api")
public class ApiEntity extends BaseEntity{

	private Long id;
	private String code;
	private String command;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCommand() {
		return command;
	}
	public void setCommand(String command) {
		this.command = command;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	
}
