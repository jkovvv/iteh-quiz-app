<?php

namespace App\Http\Controllers;
use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function create(Request $request) {
        try {
            $incoming_fields = $request->validate([
                'title' => 'required|string',
                'description' => 'required|string'
            ]);
    
            $incoming_fields['title'] = strip_tags($incoming_fields['title']);
            $incoming_fields['description'] = strip_tags($incoming_fields['description']);
            
            // Kreiraj kviz i sačuvaj rezultat u promenljivu
            $quiz = Quiz::create($incoming_fields);
    
            // Vrati JSON sa ID-jem kreiranog kviza
            return response()->json([
                'message' => 'Quiz created successfully!',
                'quiz_id' => $quiz->id
            ]);
            
        } catch (Exception $e) {
            error_log('Error:', $e->getMessage(), "\n");
            return response()->json(['message' => 'bio error brt!'], 500);
        }
    }
    

    public function read($id)
    {
        $quiz = Quiz::with('allQuestions')->find($id);
        if (!$quiz) {
            return response()->json(['error' => 'Quiz not found']);
        }
        
        return response()->json($quiz);
    }

    public function readAll()
    {
        $quizzes = Quiz::with('allQuestions')->get(); 
        return response()->json($quizzes); 
    }

    public function update(Request $request, $id)
    {
        $quiz = Quiz::findOrFail($id);

        $incoming_fields = $request->validate([
            'title' => 'sometimes|required|string',
            'description' => 'sometimes|required|string',
        ]);

        $quiz->update($incoming_fields);
        return response()->json(['message' => 'Quiz updated successfully!']);
    }

    public function delete(Quiz $quiz)
    {
        if($quiz->allQuestions()->exists()){
            //Quiz can't be deleted if there are questions with that quiz id.
            return response()->json(['message' => 'Cannot delete quiz, there are still questions in it.']);
        }
        else{
            $quiz->delete();
            return response()->json(['message' => 'Quiz deleted successfully!']);
        }
    }
}
