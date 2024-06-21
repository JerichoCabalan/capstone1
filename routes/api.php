<?php

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('api.access')->group(function () {

// Your API routes go here
Route::post('login', [App\Http\Controllers\AuthController::class, 'login']);
Route::post('register', [App\Http\Controllers\AuthController::class, 'register']);
// Route::get(`inventory_admin`, [App\Http\Controllers\InventoryAdminController::class, 'inventory_admin']);
// Route::post('register', '\App\Http\Controllers\AuthController@register');
// Route::post('forgot_password', 'App\Http\Controllers\AuthController@forgot_password');

Route::middleware('auth:api')->group(function () {
    // UserController
    Route::post('user_profile_photo_update', [App\Http\Controllers\UserController::class, "user_profile_photo_update"]);
    Route::get('user_profile_info', [App\Http\Controllers\UserController::class, "user_profile_info"]);
    Route::post('user_profile_info_update', [App\Http\Controllers\UserController::class, "user_profile_info_update"]);
    Route::post('user_update_role', [App\Http\Controllers\UserController::class, "user_update_role"]);
    Route::post('user_deactivate', [App\Http\Controllers\UserController::class, "user_deactivate"]);
    Route::post('users_update_email', [App\Http\Controllers\UserController::class, "users_update_email"]);
    Route::post('users_update_password', [App\Http\Controllers\UserController::class, "users_update_password"]);
    Route::post('users_info_update_password', [App\Http\Controllers\UserController::class, "users_info_update_password"]);
    Route::post('users_status', [App\Http\Controllers\UserController::class, "users_status"]);
    Route::apiResource('users', App\Http\Controllers\UserController::class);
    // END UserController

    // UserPermissionController
    Route::post('user_permission_status', [App\Http\Controllers\UserPermissionController::class, 'user_permission_status']);
    Route::apiResource('user_permission', App\Http\Controllers\UserPermissionController::class);
    // END UserPermissionController

    // ModuleController
    Route::apiResource('module', App\Http\Controllers\ModuleController::class);
    // END ModuleController

    // UserRolePermissionController
    Route::apiResource('user_role_permission', App\Http\Controllers\UserRolePermissionController::class);
    // END UserRolePermissionController

    // EmailTemplateController
    Route::post('email_template_multiple', [App\Http\Controllers\EmailTemplateController::class, 'email_template_multiple']);
    Route::apiResource('email_template', App\Http\Controllers\EmailTemplateController::class);
    // END EmailTemplateController

    // ProfileController
    Route::post('profile_update', [App\Http\Controllers\ProfileController::class, "profile_update"]);
    Route::post('profile_deactivate', [App\Http\Controllers\ProfileController::class, "profile_deactivate"]);
    Route::apiResource('profile', App\Http\Controllers\ProfileController::class);
    // END ProfileController
    Route::apiResource('inventory_admin', App\Http\Controllers\InventoryAdminController::class);
    // Route::post('inventory_modal', App\Http\Controllers\InventoryAdminController::class);
    Route::post('inventory_modal', [App\Http\Controllers\InventoryAdminController::class, "inventory_modal"]);
    Route::post('model', [App\Http\Controllers\InventoryAdminController::class, "model"]);
    Route::post('equipement_delete', [App\Http\Controllers\InventoryAdminController::class, "equipement_delete"]);
    Route::apiResource('borrow_stock', App\Http\Controllers\BorrowStockController::class);
    Route::post('borrow_stock_status', [App\Http\Controllers\BorrowStockController::class, "borrow_stock_status"]);
    Route::post('borrow_equipment_stock', [App\Http\Controllers\BorrowStockController::class, "borrow_equipment_stock"]);
    Route::post('model', [App\Http\Controllers\BorrowStockController::class, "model"]);
    Route::apiResource('user_role_permission', App\Http\Controllers\UserRolePermissionController::class);

    Route::apiResource('user_role', App\Http\Controllers\UserRoleController::class);


  
});

// Route::get('inventory_admin', [App\Http\Controllers\InventoryAdminController::class, 'inventory_admin']);
Route::get('faculty_load_report_print', [App\Http\Controllers\FacultyLoadMonitoringController::class, 'faculty_load_report_print']);
// Route::get('inventory_admin', [App\Http\Controllers\InventoryAdminController::class]);

// });

// function pp($data)
// {
//     echo '<pre>';
//     print_r($data);
//     echo '</pre>';
// }