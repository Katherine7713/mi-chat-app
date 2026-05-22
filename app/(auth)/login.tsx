import { useAuth } from "@features/auth/presentation/hooks/useAuth";
import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isLoading, error } = useAuth();

  return (
    // Se envuelve en un arreglo [styles.container] para solucionar el error de TypeScript
    <LinearGradient
      colors={["#4a154b", "#2c114d", "#130924"]}
      style={[styles.container]}
    >
      {/* Tarjeta con efecto Glassmorphism */}
      <BlurView intensity={25} tint="light" style={styles.card}>
        
        <Text style={styles.title}>Login</Text>
        
        {error && <Text style={styles.error}>{error}</Text>}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Ionicons 
            name="person" 
            size={18} 
            color="rgba(255, 255, 255, 0.8)" 
            style={styles.inputIcon} 
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Ionicons 
            name="lock-closed" 
            size={18} 
            color="rgba(255, 255, 255, 0.8)" 
            style={styles.inputIcon} 
          />
        </View>

        <View style={styles.rowActions}>
          <TouchableOpacity 
            style={styles.checkboxContainer} 
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]} />
            <Text style={styles.actionText}>Remember me</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.actionText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => login({ email, password })}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#2c114d" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* Enlace de Registro */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <Link href="/(auth)/register" style={styles.link}>
            Register
          </Link>
        </View>

      </BlurView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    overflow: "hidden", 
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    position: "relative",
    marginBottom: 18,
  },
  input: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    paddingVertical: 12,
    paddingLeft: 20,
    paddingRight: 45, 
    color: "#fff",
    fontSize: 15,
  },
  inputIcon: {
    position: "absolute",
    right: 20,
    top: 15,
  },
  rowActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginBottom: 25,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 3,
    marginRight: 8,
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  actionText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 13,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 14,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  buttonText: { 
    color: "#2c114d", 
    fontWeight: "bold", 
    fontSize: 16 
  },
  error: { 
    color: "#ff4d4d", 
    marginBottom: 15, 
    textAlign: "center",
    fontWeight: "600"
  },
  registerContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  registerText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
  },
  link: { 
    fontWeight: "bold", 
    color: "#fff",
    fontSize: 14,
    textDecorationLine: "underline"
  },
});