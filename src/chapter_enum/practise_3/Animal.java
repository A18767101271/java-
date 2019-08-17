package chapter_enum.practise_3;

/**
 * 枚举实现接口
 * Created by wislie on 2019/5/8.
 */
public enum Animal implements Action {
    DOG("bite"), CAT("catch");

    private String action;

    Animal(String action) {
        this.action = action;
    }

    @Override
    public void perform() {
        System.out.println(this + ":" + action);
    }

    public static void main(String[] args) {
        Class<?> clazz = Animal.class;
        if (clazz.isEnum()) {
            Animal[] animals = (Animal[]) clazz.getEnumConstants();
            for (Animal animal : animals) {
                animal.perform();
            }
        }
    }
}

/**
 * 打印结果:
 * DOG:bite
 * CAT:catch
 */
