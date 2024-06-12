<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentialsEmail = [
            'email' => $request->email,
            'password' => $request->password
        ];
    
        $credentialsUsername = [
            'username' => $request->email, // Assuming email can also be used as username
            'password' => $request->password
        ];
    
        $user = null;
    
        if (auth()->attempt($credentialsEmail) || auth()->attempt($credentialsUsername)) {
            $user = auth()->user();
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Unrecognized username or password. Forgot your password?',
            ], 401);
        }
    
        if ($user->status == 'Deactivated') {
            return response()->json([
                'success' => false,
                'message' => 'This account is deactivated!',
            ], 200);
        }
    
        $dataUser = \App\Models\Profile::firstWhere("user_id", $user->id);
        $dataUserRole = \App\Models\UserRole::find($user->user_role_id);
    
        if ($dataUser) {
            $user['firstname'] = $dataUser->firstname ?? null;
            $user['lastname'] = $dataUser->lastname ?? null;
        }
    
        if ($dataUserRole) {
            $user['role'] = $dataUserRole->role ?? null;
        }
    
        if (!$request->from || ($request->from == 'faculty_monitoring_attendance_checker' && in_array($user->user_role_id, [1, 2]))) {
            $token = $user->createToken(date('Y') . '-' . env('APP_NAME'))->accessToken;
            return response()->json([
                'success' => true,
                'data' => $user,
                'token' => $token,
            ], 200);
        }
    
        return response()->json([
            'success' => false,
            'message' => 'Permission not allowed!',
        ], 200);
    }
    
    
    
    

   
    public function register(Request $request)
    { 
        $validatedData = $request->validate([
            'username' => 'required|string|max:255', 
            'lastname' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone_number' => 'required|string|max:255',
            'role' => 'required|string|max:255',
        ]);
    
        $userRole = \App\Models\UserRole::firstWhere('role', $validatedData['role']);
    
        if (!$userRole) {
            return response()->json([
                'success' => false,
                'message' => 'Role does not exist!',
            ], 400);
        }
    
        $user = new \App\Models\User();
        $user->username = $validatedData['username']; 
        $user->lastname = $validatedData['lastname'];
        $user->firstname = $validatedData['firstname'];
        $user->email = $validatedData['email'];
        $user->password = bcrypt($validatedData['password']);
        $user->user_role_id = $userRole->id;
        $user->phone_number = $validatedData['phone_number'];
        $user->save();
    
        return response()->json([
            'success' => true,
            'message' => 'User registered successfully!',
        ], 200);
    }
  

public function forgot_password(Request $request)
{
//
}
}