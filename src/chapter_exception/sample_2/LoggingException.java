package chapter_exception.sample_2;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.logging.Logger;

/**
 * Created by wislie on 2018/11/1.
 */
public class LoggingException extends Exception {

    private static Logger logger = Logger.getLogger("LoggingException");

    public LoggingException() {
        StringWriter writer = new StringWriter();
        printStackTrace(new PrintWriter(writer));
        logger.severe(writer.toString()); //保存日志

    }

    public static void main(String[] args) {

        try{
            throw new LoggingException();
        }catch (LoggingException e){
//            e.printStackTrace(System.out);
        }
    }
}
