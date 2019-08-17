package chapter_generics.practise_20;

import java.util.HashMap;
import java.util.Map;

/**
 * 擦错补偿
 */
public class GenericsCompensateClear {

    public static void main(String[] args) {
        ClassTypeCapture<Building> capture = new ClassTypeCapture<>(Building.class);
        capture.addType("chapter_1", Building.class);
        Class<?> cls = capture.createNew("chapter_1");
        System.out.print(cls.isInstance(new House()));
//        capture.getClass()
    }
}

class ClassTypeCapture<T> {

    Class<T> kind;
    Map<String, Class<?>> map = new HashMap<>();

    public ClassTypeCapture(Class<T> kind) {
        this.kind = kind;
    }

    public void belongTo(Object arg) {
        kind.isInstance(arg);
    }

    public void addType(String typeName, Class<?> kind) {
        map.put(typeName, kind);
    }

    public Class<?> createNew(String typeName) {
        Class<?> kind = map.get(typeName);
        return kind;
    }
}

class Building {
}

class House extends Building {
}
