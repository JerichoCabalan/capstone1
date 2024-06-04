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
    
        if (auth()->attempt($credentialsEmail)) {
            $user = auth()->user();
    
            $dataUser = \App\Models\Profile::firstWhere("user_id", $user->id);
            $dataUserRole = \App\Models\UserRole::find($user->user_role_id);
    
            if ($dataUser) {
                $user['firstname'] = $dataUser->firstname ?? null;
                $user['lastname'] = $dataUser->lastname ?? null;
            }
    
            if ($dataUserRole) {
                $user['role'] = $dataUserRole->role ?? null;
            }
    
            if ($user->status == 'Active') {
                // Check if the user has the required role and from value
                if ($request->from && $request->from == 'faculty_monitoring_attendance_checker' && in_array($user->user_role_id, [1, 2])) {
                    $token = $user->createToken(date('Y') . '-' . env('APP_NAME'))->accessToken;
                    return response()->json([
                        'success' => true,
                        'data' => $user,
                        'token' => $token,
                    ], 200);
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Permission not allowed!',
                    ], 200);
                }
            } else if ($user->status == 'Deactivated') {
                return response()->json([
                    'success' => false,
                    'message' => 'This account is deactivated!',
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Error',
                    'description' => 'Unrecognized username or password. <b>Forgot your password?</b>',
                ], 401);
            }
        } else {
            $credentialsUsername = [
                'username' => $request->email,
                'password' => $request->password
            ];
            if (auth()->attempt($credentialsUsername)) {
                $user = auth()->user();
    
                $dataUser = \App\Models\Profile::firstWhere("user_id", $user->id);
                $dataUserRole = \App\Models\UserRole::find($user->user_role_id);
    
                if ($dataUser) {
                    $user['firstname'] = $dataUser->firstname ?? null;
                    $user['lastname'] = $dataUser->lastname ?? null;
                }
    
                if ($dataUserRole) {
                    $user['role'] = $dataUserRole->role ?? null;
                }
    
                if ($user->status == 'Active') {
                    if ($request->from) {
                        if ($request->from == 'faculty_monitoring_attendance_checker' && in_array($user->user_role_id, [1, 2])) {
                            $token = $user->createToken(date('Y') . '-' . env('APP_NAME'))->accessToken;
                            return response()->json([
                                'success' => true,
                                'data' => $user,
                                'token' => $token,
    
                            ], 200);
                        } else {
                            return response()->json([
                                'success' => false,
                                'message' => 'Permission not allowed!',
                            ], 200);
                        }
                    } else {
                        $token = $user->createToken(date('Y') . '-' . env('APP_NAME'))->accessToken;
    
                        return response()->json([
                            'success' => true,
                            'data' => $user,
                            'token' => $token,
    
                        ], 200);
                    }
                } else if ($user->status == 'Deactivated') {
                    return response()->json([
                        'success' => false,
                        'message' => 'Account is deactivated!',
                    ], 200);
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Error',
                        'description' => 'Unrecognized username or password. <b>Forgot your password?</b>',
                    ], 401);
                }
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Error',
                    'description' => 'Unrecognized username or password. <b>Forgot your password?</b>',
                ], 401);
            }
        }
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
    
        $user = new \App\Models\User();
        $user->username = $validatedData['username']; 
        $user->lastname = $validatedData['lastname'];
        $user->firstname = $validatedData['firstname'];
        $user->email = $validatedData['email'];
        $user->password = bcrypt($validatedData['password']);
        $user->role = $validatedData['role'];
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