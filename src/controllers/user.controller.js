import { UserService } from "../services/user.service.js";
export class UserController {
  constructor() {
    this.userService = new UserService()
  }

  getAllUser = (req, res) => {
    const users = this.userService.getAllUsers();
    res.render('users/user', { users });
  };

  getUserById = (req, res) => {
    const user = this.userService.getUserById(req.params.id)
    if (!user) return res.status(404).json("User not found")
    res.status(200).json(user);
  }

  showCreateForm = (req, res) => {
    res.render('users/addform', { 
      title: 'Create New User',
      actionUrl: '/home/users/create',
      buttonText: 'Create User'
    });
  };

  createUser = (req, res) => {
    const newUser = this.userService.createUser(req.body);
    res.redirect('/home/users');
  };

  showEditForm = (req, res) => {
    const user = this.userService.getUserById(req.params.id);
    if (!user) return res.status(404).render('error', { message: 'User not found' });
    
    res.render('users/addform', { 
      title: 'Edit User',
      actionUrl: `/home/users/${user.id}/edit`,
      buttonText: 'Update User',
      user
    });
  };

  updateUser = (req, res) => {
    const updatedUser = this.userService.updateUser(req.params.id, req.body);
    if (!updatedUser) return res.status(404).render('error', { message: 'User not found' });
    res.redirect('/home/users');
  }

  deleteUser = (req, res) => {
    const isDeleted = this.userService.deleteUser(req.params.id);
    if (!isDeleted) return res.status(404).render('error', { message: 'User not found' });
    res.redirect('/home/users');
  }
}