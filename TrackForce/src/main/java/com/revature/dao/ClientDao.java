package com.revature.dao;

import java.util.List;

import com.revature.entity.TfClient;
import com.revature.entity.TfEndClient;

public interface ClientDao {

	
	public List<TfClient> getAllTfClients();
	public TfClient getClient(String name);
	public TfClient getClient(Integer id);
	TfEndClient getEndClient(int id);


}
