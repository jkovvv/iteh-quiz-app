<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable =['question_text', 'right', 'wrong1', 'wrong2', 'wrong3','quiz_id'];

    public function quiz(){
        return $this->belongsTo(Quiz::class, 'quiz_id');
    }
}
