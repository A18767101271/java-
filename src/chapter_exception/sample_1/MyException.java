package chapter_exception.sample_1;

/**
 *
 * Created by wislie on 2018/11/1.
 */
public class MyException extends Exception {

    public MyException(){}

    public MyException(String msg){
        super(msg);
    }
}
