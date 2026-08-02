<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();

            // Foreign Key to users table (1-to-1 relationship)
            $table->foreignId('user_id')
                ->constrained()
                ->onDelete('cascade');

            // Foreign Key to departments table
            $table->foreignId('department_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            // Self-referential Foreign Key for Manager (Reporting hierarchy)
            $table->foreignId('manager_id')
                ->nullable()
                ->constrained('employees')
                ->nullOnDelete();

            // Core Profile Information
            $table->string('employee_code')->unique(); // e.g., EMP-1001
            $table->string('phone')->nullable();
            $table->string('job_title');
            $table->decimal('salary', 10, 2); // Handles up to 99,999,999.99
            $table->date('hire_date');
            $table->text('address')->nullable();
            $table->string('avatar_url')->nullable(); // For profile photo uploads

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
