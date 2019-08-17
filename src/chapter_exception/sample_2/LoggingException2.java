package chapter_exception.sample_2;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.logging.Logger;

/**
 * Created by wislie on 2018/11/1.
 */
public class LoggingException2 extends Exception {

    private static Logger logger = Logger.getLogger("LoggingException");

    static void loggingException2(Exception e) {
        StringWriter writer = new StringWriter();
        e.printStackTrace(new PrintWriter(writer));
        logger.severe(writer.toString()); //保存日志

    }

    public static void main(String[] args) {

        try{
            throw new LoggingException2();
        }catch (LoggingException2 e){
            loggingException2(e);
        }
    }
}
