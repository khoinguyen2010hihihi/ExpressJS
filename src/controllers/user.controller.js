import { UserService } from "../services/user.service.js";
export class UserController {
  constructor() {
    this.userService = new UserService()
  }

  getAllUser = (req, res) => {
    this.userService.getAllUsers()
      .then(users => {
        console.log(users);
        res.render('users/user', { users })
      })
      .catch(error => console.error("Error fetching users:", error));
  }

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
    const hobbies = req.body.hobbies ? req.body.hobbies.split(',').map(hobby => hobby.trim()) : [];
  
    const newUser = {
      ...req.body,
      hobbies: hobbies
    };
  
    this.userService.createUser(newUser)
      .then(() => res.redirect('/home/users'))
      .catch((error) => res.status(500).send("Error creating user"));
  };

  showEditForm = (req, res) => {
    this.userService.getUserById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).render('error', { message: 'User not found' });
        }
        res.render('users/addform', {
          title: 'Edit User',
          actionUrl: `/home/users/${user._id}/edit`,
          buttonText: 'Update User',
          user
        });
      })
      .catch(error => {
        console.error("Error fetching user:", error);
        res.status(500).render('error', { message: 'Error fetching user' });
      });
  };
  

  updateUser = (req, res) => {
    const hobbies = req.body.hobbies ? req.body.hobbies.split(',').map(hobby => hobby.trim()) : [];
  
    const updatedUserData = {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      hobbies: hobbies,
    };
  
    this.userService.updateUser(req.params.id, updatedUserData)
      .then(updatedUser => {
        if (!updatedUser) {
          return res.status(404).render('error', { message: 'User not found' });
        }
        res.redirect('/home/users');
      })
      .catch(error => {
        console.error("Error updating user:", error);
        res.status(500).render('error', { message: 'Error updating user' });
      });
  };
  

  deleteUser = (req, res) => {
    const isDeleted = this.userService.deleteUser(req.params.id)
    if (!isDeleted) return res.status(404).render('error', { message: 'User not found' })
    res.redirect('/home/users')
  }
}
