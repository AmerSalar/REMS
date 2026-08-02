<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CalcController extends Controller
{
    public function sum(float $n, float $m) {
        return $n+$m;
    }

    public function subtract(float $n, float $m) {
        return $n-$m;
    }
}
