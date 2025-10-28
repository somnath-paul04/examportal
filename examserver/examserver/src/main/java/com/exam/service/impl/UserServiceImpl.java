package com.exam.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // <-- ADDED IMPORT
import org.springframework.stereotype.Service;

import com.exam.helper.UserFoundException;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	// Creating User
	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {

		User local = this.userRepository.findByUsername(user.getUsername());

		if (local != null) {
			System.out.println("User is already there !!");
			throw new UserFoundException();
		} else {

			// CRITICAL UPDATE: Hash the password before saving
			user.setPassword(this.passwordEncoder.encode(user.getPassword()));

			// Create User
			for (UserRole ur : userRoles) {
				roleRepository.save(ur.getRole());
			}
			user.getUserRoles().addAll(userRoles);
			local = this.userRepository.save(user);

		}
		return local;
	}

	// Getting user by username
	@Override
	public User getUser(String username) {
		return this.userRepository.findByUsername(username);
	}

	@Override
	public void deleteUser(Long userId) {
		this.userRepository.deleteById(userId);
	}
	
	// Update logic
	@Override
	public User updateUser(User user) {
	    
	    // 1. Find the existing user by ID (or username, depending on your model)
	    User existingUser = this.userRepository.findById(user.getId()).orElse(null);
	    
	    if (existingUser == null) {
	        // You might throw a custom exception here, e.g., new UserNotFoundException("User not found for update.");
	        System.out.println("User not found for update.");
	        return null;
	    }
	    
	    // 2. Update fields
	    existingUser.setFirstName(user.getFirstName());
	    existingUser.setLastName(user.getLastName());
	    existingUser.setEmail(user.getEmail());
	    existingUser.setPhone(user.getPhone());
	    existingUser.setProfile(user.getProfile());
	    
	    // 3. Handle password change securely
	    // Only update and hash the password if a new, non-empty password is provided
	    String newPassword = user.getPassword();
	    if (newPassword != null && !newPassword.isEmpty()) {
	        existingUser.setPassword(this.passwordEncoder.encode(newPassword));
	    }
	    
	    // Note: Updating roles is complex and typically handled in a separate method. 
	    // This example focuses on basic user details.
	    
	    // 4. Save the updated user
	    return this.userRepository.save(existingUser);
	}


}