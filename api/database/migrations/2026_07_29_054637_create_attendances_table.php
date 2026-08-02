<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();

            $table->foreignId('employee_id')
                ->constrained()
                ->onDelete('cascade');

            $table->date('date');
            $table->time('clock_in');
            $table->time('clock_out')->nullable();
            $table->enum('status', ['present', 'late', 'half_day', 'absent'])->default('present');
            $table->text('notes')->nullable();

            $table->timestamps();

            // Prevent an employee from having duplicate clock-in records on the same day
            $table->unique(['employee_id', 'date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
