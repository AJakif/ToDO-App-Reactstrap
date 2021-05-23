<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\task;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    public function index(){
        return response()->json(DB::select('select * from tasks'));
    }

    public function save(Request $request){
        $task = new task;
                $task->name = $request->name;
                $task->description = $request->description;
                $task->save();

                $message = "Task added succesfully";
                return response()->json([$task,$message],200);
    }
    public function get($id){
        $task = task::find($id);
        $message = "task found succesfully";
        return response()->json([$task,$message],200);
    }
    public function update(Request $request, $id){
        $task = task::find($id);
        $task->name = $request->name;
        $task->description = $request->description;
        $task->save();

                $message = "task Updated succesfully";
                return response()->json([$task,$message],200);
    }
    public function delete($id){
        $task=task::find($id);
        if($task){
            $status=$task->delete();
            if($status){
                $message = "task Deleted succesfully";
                return response()->json([$status,$message],200);
            }
            else{
                $message = "Error please try again";
                return response()->json([$status,$message],200);
            }
            
        }
        else{
            $message = "task not found";
                return response()->json([$message],200);
        }
    }
}
