package org.sharpshoes.radish.entity;

@Table(name="t_api")
public class ApiEntity extends BaseEntity{

	private Long id;
	private String key;
	private String command;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public String getCommand() {
		return command;
	}
	public void setCommand(String command) {
		this.command = command;
	}
	
}
