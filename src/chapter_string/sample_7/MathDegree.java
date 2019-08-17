package chapter_string.sample_7;

/**
 * Math中的角度换算
 * Created by wislie on 2019/3/6.
 */
public class MathDegree {

    public static void main(String[] args) {

        //角度转换成弧度
        double rad = toRadians(90); //Math.PI/2
        //弧度转换成角度
        double degree = toDegrees(rad); //90
        //根据坐标得到弧度
        double coordinateRad = getCoordinateRadians(0, 1); //Math.PI/2
        //根据斜边长度，弧度，求角度邻边的直角边长度
        double cosSideLength = getCosSideLength(1, Math.PI / 3); //1/2
        //根据斜边长度，弧度，求角度对边的直角边长度
        double sinSideLength = getSinSideLength(1, Math.PI / 3); //√3/2
        //根据直角边，斜边，求两条边夹角的弧度
        double cosRadians = getCosRadians(1.0 / 2, 1); //Math.PI/3
        //根据直角边，斜边，求直角边对角的弧度
        double sinRadians = getSinRadians(Math.sqrt(3) / 2, 1); //Math.PI/3

        System.out.println("rad:" + rad);
        System.out.println("degree:" + degree);
        System.out.println("coordinateRad:" + coordinateRad);
        System.out.println("cosSideLength:" + cosSideLength);
        System.out.println("sinSideLength:" + sinSideLength);
        System.out.println("cosRadians:" + cosRadians);
        System.out.println("sinRadians:" + sinRadians);
    }

    /**
     * 角度转换成弧度
     *
     * @param angle
     * @return
     */
    private static double toRadians(double angle) {
        double rad = angle / 180 * Math.PI;
        return rad;
    }

    /**
     * 弧度转换成角度
     *
     * @param rad
     * @return
     */
    private static double toDegrees(double rad) {
        double angle = rad * 180 / Math.PI;
        return angle;
    }

    /**
     * 根据坐标得到弧度
     *
     * @param x
     * @param y
     * @return
     */
    private static double getCoordinateRadians(double x, double y) {
        double rad = Math.atan2(y, x);
        return rad;
    }

    /**
     * 根据斜边长度，弧度，求角度邻边的直角边长度
     *
     * @param hypotenuse
     * @param rad
     * @return
     */
    private static double getCosSideLength(double hypotenuse, double rad) {
        double cosSideLength = hypotenuse * Math.cos(rad);
        return cosSideLength;
    }

    /**
     * 根据斜边长度，弧度，求角度对边的直角边长度
     *
     * @param hypotenuse
     * @param rad
     * @return
     */
    private static double getSinSideLength(double hypotenuse, double rad) {
        double sinSideLength = hypotenuse * Math.sin(rad);
        return sinSideLength;
    }

    /**
     * 根据直角边，斜边，求两条边夹角的弧度
     *
     * @param cosSideLength
     * @param hypotenuse
     * @return
     */
    private static double getCosRadians(double cosSideLength, double hypotenuse) {
        double rad = Math.acos(cosSideLength / hypotenuse);
        return rad;
    }

    /**
     * 根据直角边，斜边，求直角边对角的弧度
     *
     * @param sinSideLength
     * @param hypotenuse
     * @return
     */
    private static double getSinRadians(double sinSideLength, double hypotenuse) {
        double rad = Math.asin(sinSideLength / hypotenuse);
        return rad;
    }
}
