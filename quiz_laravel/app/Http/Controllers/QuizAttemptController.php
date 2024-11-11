<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\QuizAttempt;
use App\Models\Quiz;
use App\Models\User;

class QuizAttemptController extends Controller
{
    public function create(Request $request){
        $incoming_fields = $request->validate([
            'user_id' => 'required|integer',
            'quiz_id' => 'required|integer',
            'score' => 'required|numeric|min:0|max:100'
        ]);

        $incoming_fields['attempted_at'] = now();
        QuizAttempt::create($incoming_fields);

        return response()->json(['message' => 'Quiz attempt created successfully!']);
    }

    public function readLast($quiz_id, $user_id)
    {
        $quizAttempt = QuizAttempt::where('quiz_id', $quiz_id)->where('user_id', $user_id)->latest()->first();

        if (!$quizAttempt) {
        return response()->json([
            'message' => 'No quiz attempt found for the given user and quiz.'
        ]);
        }
        return response()->json($quizAttempt);
    }

    public function readAll($quiz_id, $user_id)
    {
        $quizAttempts = QuizAttempt::where('quiz_id', $quiz_id)->where('user_id', $user_id)->get();

        if (!$quizAttempts) {
        return response()->json([
            'message' => 'No quiz attempts found for the given user and quiz.'
        ]);
        }
        return response()->json($quizAttempts);
    }

    public function readAllFromUser($user_id)
    {
        $quizAttempts = QuizAttempt::with('quiz')
            ->where('user_id', $user_id)
            ->orderBy('created_at', 'desc')
            ->paginate(5); 

        if ($quizAttempts->isEmpty()) {
            return response()->json([
                'message' => 'No quiz attempts found for the given user.'
            ], 404);
        }

        return response()->json($quizAttempts, 200);
    }

    public function update(Request $request, $attempt_id)
    {
        $quizAttempt = QuizAttempt::findOrFail($attempt_id);

        $incoming_fields = $request->validate([
            'user_id' => 'required|integer',
            'quiz_id' => 'required|integer',
            'score' => 'required|numeric|min:0|max:100'
        ]);

        $quizAttempt->update($incoming_fields);
        return response()->json(['message' => 'Quiz attempt updated successfully!']);
    }

    public function delete($attempt_id)
    {
        $quizAttempt = QuizAttempt::findOrFail($attempt_id);
        
        $quizAttempt->delete();
        return response()->json(['message' => 'Quiz attempt deleted successfully!']);
        
    }
}
