package com.exam.helper;

public class UserFoundException extends Exception {
	public UserFoundException() {
		super("User with this username is already there in Db !! try with another one !!");
	}
	public UserFoundException(String msg) {
		super(msg);
	}

}
