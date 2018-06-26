package chapter_generics.practise_9;

/**
 * 擦除
 */
public class GenericsClear {
    public static void main(String[] args) {
        Derived2 d2 = new Derived2();
        Object obj = d2.getData();
        //参数类型擦除 T 会被认为是Object
        d2.setData(obj);
    }
}

class Generics<T> {
    private T data;

    public void setData(T data) {
        this.data = data;
    }

    public T getData() {
        return data;
    }
}

class Derived1<T> extends Generics<T> {

}


class Derived2 extends Generics {
}

//编译不通过, 编译器期望得到一个原生基类
    /*class Derived3 extends Generics<?>{

    }*/
