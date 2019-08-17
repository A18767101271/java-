package chapter_exception.sample_3;

/**
 * Created by wislie on 2018/11/2.
 */
public class DynamicFieldsException extends Exception {

    //初始化fields数组

    //toString 打印fields数组的值

    //hasField 是否有fields[i][0]相同数值的id

    //getFieldNumber 获取到id,则返回下标index;否则，抛出NoSuchFieldException

    //makeField 如果fields[i][0]为null,则将id赋值给field[i][0],并返回i的值;否则，扩容

    //getField 获取fields[i][1]

    //setField(String id, Object val) 先判断是否为null, 抛出异常; 判断是否有hasField
    //如果返回值为-1,则makeField;再去调用getField(id)获取到result的值 fields[i][1] = val



}
