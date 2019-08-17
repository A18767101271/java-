package chapter_enum.practise_1;

import java.math.RoundingMode;

/**
 * Created by wislie on 2019/5/6.
 */
public enum Planet{

    EARTH(1,1,1),
    MARS(2,2,2),
    WOODS(3,3,3);

    private final double mass;
    private final double radius;
    private final double surfaceGravity;

    Planet(double mass, double radius, double surfaceGravity) {
        this.mass = mass;
        this.radius = radius;
        this.surfaceGravity = surfaceGravity;
    }

    public double getMass() {
        return mass;
    }

    public double getRadius() {
        return radius;
    }

    public double getSurfaceGravity() {
        return surfaceGravity;
    }

    public double surfaceWeight(double mass) {
        return mass * surfaceGravity;
    }

    public static void main(String[] args) {

        System.out.println(RoundingMode.CEILING == RoundingMode.CEILING); //true
        System.out.println("toString:"+RoundingMode.CEILING.toString());
        RoundingMode.class.getEnumConstants();
        Planet[] planets = Planet.values();
        for (Planet planet : planets) {
            System.out.println("surfaceGravity:" +
                    planet.surfaceWeight(planet.getMass())+"\n");
        }
    }
}
