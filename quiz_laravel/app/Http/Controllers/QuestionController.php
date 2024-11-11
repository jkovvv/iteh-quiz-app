<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //Forma pa store?
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $incoming_fields = $request->validate([
            'question_text' => 'required|string',
            'right' => 'required|string',
            'wrong1' => 'required|string',
            'wrong2' => 'required|string',
            'wrong3' => 'required|string',
            'quiz_id' => 'required|integer|exists:quizzes,id'
        ]);

        $incoming_fields['question_text'] = strip_tags($incoming_fields['question_text']);
        $incoming_fields['right'] = strip_tags($incoming_fields['right']);
        $incoming_fields['wrong1'] = strip_tags($incoming_fields['wrong1']);
        $incoming_fields['wrong2'] = strip_tags($incoming_fields['wrong2']);
        $incoming_fields['wrong3'] = strip_tags($incoming_fields['wrong3']);
        $incoming_fields['quiz_id'] = strip_tags($incoming_fields['quiz_id']);
        
        Question::create($incoming_fields);
        return response()->json(['message' => 'Question stored successfully!'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $question = Question::find($id);

        if (!$question) {
            return response()->json(['error' => 'Question not found']);
        }

        return response()->json($question);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $question = Question::findOrFail($id);

        $incoming_fields = $request->validate([
            'question_text' => 'sometimes|required|string',
            'right' => 'sometimes|required|string',
            'wrong1' => 'sometimes|required|string',
            'wrong2' => 'sometimes|required|string',
            'wrong3' => 'sometimes|required|string',
            'quiz_id' => 'sometimes|required|integer|exists:quizzes,id',
        ]);

        $question->update($incoming_fields);
        return response()->json(['message' => 'Question updated successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Question $question)
    {        
        $question->delete();
        return response()->json(['message' => 'Question deleted successfully!']);
    }
}
