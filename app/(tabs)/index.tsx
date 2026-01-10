import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";

const { width } = Dimensions.get("window");
const BOARD_SIZE = Math.min(width - 40, 400);

interface Player {
  name: string;
  color: string;
  pieces: number[];
  home: number;
}

export default function LudoGame() {
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [message, setMessage] = useState("Red player - Roll the dice!");
  const [players, setPlayers] = useState<Player[]>([
    { name: "Red", color: "#ef4444", pieces: [0, 0, 0, 0], home: 0 },
    { name: "Blue", color: "#3b82f6", pieces: [0, 0, 0, 0], home: 0 },
    { name: "Green", color: "#22c55e", pieces: [0, 0, 0, 0], home: 0 },
    { name: "Yellow", color: "#eab308", pieces: [0, 0, 0, 0], home: 0 },
  ]);

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);

    let count = 0;
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      count++;

      if (count >= 8) {
        clearInterval(interval);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalValue);
        setIsRolling(false);
        handleDiceRoll(finalValue);
      }
    }, 100);
  };

  const handleDiceRoll = (value: number) => {
    const player = players[currentPlayer];
    const canMove = player.pieces.some((pos) => pos > 0 || value === 6);

    if (!canMove && value !== 6) {
      setMessage(`${player.name} rolled ${value} - No moves!`);
      setTimeout(() => nextPlayer(), 1500);
      return;
    }

    setMessage(`${player.name} rolled ${value} - Tap a piece`);
  };

  const movePiece = (pieceIndex: number) => {
    const player = players[currentPlayer];
    const currentPos = player.pieces[pieceIndex];

    if (currentPos === 0 && diceValue !== 6) {
      setMessage("Need a 6 to start!");
      return;
    }

    const newPlayers = [...players];

    if (currentPos === 0 && diceValue === 6) {
      newPlayers[currentPlayer].pieces[pieceIndex] = 1;
      setMessage(`${player.name} entered!`);
    } else {
      const newPos = currentPos + diceValue;
      if (newPos <= 57) {
        newPlayers[currentPlayer].pieces[pieceIndex] = newPos;
        if (newPos === 57) {
          newPlayers[currentPlayer].home += 1;
          setMessage(`${player.name} HOME! 🎉`);
        } else {
          setMessage(`${player.name} moved ${diceValue}`);
        }
      } else {
        setMessage("Too far!");
        return;
      }
    }

    setPlayers(newPlayers);

    if (newPlayers[currentPlayer].home === 4) {
      setMessage(`🏆 ${player.name} WINS! 🏆`);
      return;
    }

    if (diceValue !== 6) {
      setTimeout(() => nextPlayer(), 1000);
    }
  };

  const nextPlayer = () => {
    const next = (currentPlayer + 1) % 4;
    setCurrentPlayer(next);
    setMessage(`${players[next].name}'s turn!`);
  };

  const renderDice = () => {
    const dotPos: { [key: number]: [number, number][] } = {
      1: [[1, 1]],
      2: [
        [0, 0],
        [2, 2],
      ],
      3: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      4: [
        [0, 0],
        [0, 2],
        [2, 0],
        [2, 2],
      ],
      5: [
        [0, 0],
        [0, 2],
        [1, 1],
        [2, 0],
        [2, 2],
      ],
      6: [
        [0, 0],
        [0, 2],
        [1, 0],
        [1, 2],
        [2, 0],
        [2, 2],
      ],
    };

    return dotPos[diceValue].map(([row, col], idx) => (
      <View
        key={idx}
        style={[styles.dot, { top: row * 20 + 10, left: col * 20 + 10 }]}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>🎲 Ludo Game 🎲</Text>

        {/* Players */}
        <View style={styles.players}>
          {players.map((p, i) => (
            <View
              key={i}
              style={[styles.card, currentPlayer === i && styles.active]}
            >
              <View style={[styles.dot2, { backgroundColor: p.color }]} />
              <Text style={styles.name}>{p.name}</Text>
              <Text style={styles.score}>🏠 {p.home}/4</Text>
            </View>
          ))}
        </View>

        {/* Message */}
        <View style={styles.msgBox}>
          <Text style={styles.msg}>{message}</Text>
        </View>

        {/* Dice */}
        <TouchableOpacity
          style={[styles.diceBtn, isRolling && styles.rolling]}
          onPress={rollDice}
          disabled={isRolling}
        >
          <View style={styles.dice}>{renderDice()}</View>
          <Text style={styles.diceText}>
            {isRolling ? "Rolling..." : "Roll"}
          </Text>
        </TouchableOpacity>

        {/* Board */}
        <View style={[styles.board, { width: BOARD_SIZE, height: BOARD_SIZE }]}>
          {/* Red */}
          <View
            style={[styles.home, styles.tl, { backgroundColor: "#fee2e2" }]}
          >
            <View style={styles.circle}>
              {[0, 1, 2, 3].map((i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.piece, { backgroundColor: players[0].color }]}
                  onPress={() =>
                    currentPlayer === 0 && !isRolling && movePiece(i)
                  }
                >
                  <Text style={styles.pieceText}>{players[0].pieces[i]}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Blue */}
          <View
            style={[styles.home, styles.tr, { backgroundColor: "#dbeafe" }]}
          >
            <View style={styles.circle}>
              {[0, 1, 2, 3].map((i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.piece, { backgroundColor: players[1].color }]}
                  onPress={() =>
                    currentPlayer === 1 && !isRolling && movePiece(i)
                  }
                >
                  <Text style={styles.pieceText}>{players[1].pieces[i]}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Green */}
          <View
            style={[styles.home, styles.bl, { backgroundColor: "#dcfce7" }]}
          >
            <View style={styles.circle}>
              {[0, 1, 2, 3].map((i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.piece, { backgroundColor: players[2].color }]}
                  onPress={() =>
                    currentPlayer === 2 && !isRolling && movePiece(i)
                  }
                >
                  <Text style={styles.pieceText}>{players[2].pieces[i]}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Yellow */}
          <View
            style={[styles.home, styles.br, { backgroundColor: "#fef9c3" }]}
          >
            <View style={styles.circle}>
              {[0, 1, 2, 3].map((i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.piece, { backgroundColor: players[3].color }]}
                  onPress={() =>
                    currentPlayer === 3 && !isRolling && movePiece(i)
                  }
                >
                  <Text style={styles.pieceText}>{players[3].pieces[i]}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Center */}
          <View style={styles.center}>
            <Text style={styles.centerText}>LUDO</Text>
          </View>
        </View>

        {/* Rules */}
        <View style={styles.rules}>
          <Text style={styles.ruleTitle}>How to Play:</Text>
          <Text style={styles.rule}>• Roll 6 to start</Text>
          <Text style={styles.rule}>• Tap piece to move</Text>
          <Text style={styles.rule}>• Get all home to win!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  scroll: { padding: 20, alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  players: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
    justifyContent: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    gap: 6,
  },
  active: { borderColor: "#3b82f6", backgroundColor: "#eff6ff" },
  dot2: { width: 12, height: 12, borderRadius: 6 },
  name: { fontSize: 14, fontWeight: "600" },
  score: { fontSize: 12, color: "#64748b" },
  msgBox: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    width: "100%",
    borderWidth: 2,
    borderColor: "#e2e8f0",
  },
  msg: { fontSize: 16, fontWeight: "600", textAlign: "center" },
  diceBtn: { alignItems: "center", marginBottom: 20 },
  rolling: { opacity: 0.6 },
  dice: {
    width: 70,
    height: 70,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "#3b82f6",
    marginBottom: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1e293b",
    position: "absolute",
  },
  diceText: { fontSize: 14, fontWeight: "600", color: "#3b82f6" },
  board: {
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "#1e293b",
    marginBottom: 20,
  },
  home: {
    position: "absolute",
    width: "40%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#94a3b8",
  },
  tl: { top: 0, left: 0 },
  tr: { top: 0, right: 0 },
  bl: { bottom: 0, left: 0 },
  br: { bottom: 0, right: 0 },
  circle: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "70%",
    height: "70%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  piece: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  pieceText: { color: "white", fontSize: 10, fontWeight: "bold" },
  center: {
    position: "absolute",
    top: "40%",
    left: "40%",
    width: "20%",
    height: "20%",
    backgroundColor: "#fbbf24",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#1e293b",
  },
  centerText: { fontSize: 16, fontWeight: "bold", color: "white" },
  rules: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    width: "100%",
    borderWidth: 2,
    borderColor: "#e2e8f0",
  },
  ruleTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  rule: { fontSize: 14, color: "#64748b", marginBottom: 4 },
});
