import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const usePagination = ({
  currPage,
  totalPages,
  pagesPerBatch,
}: Record<string, number>) => {
  const pagination = React.useMemo(() => {
    let startPage = Math.max(1, currPage - Math.floor(pagesPerBatch / 2));
    let endPage = Math.min(totalPages, startPage + pagesPerBatch - 1);
    startPage = Math.max(1, endPage - pagesPerBatch + 1);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [currPage, totalPages, pagesPerBatch]);

  return pagination;
};
export interface PaginationProps {
  currPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pagesPerBatch?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currPage,
  totalPages,
  onPageChange,
  pagesPerBatch = 3,
}) => {
  const getPageNumbers = usePagination({
    currPage,
    totalPages,
    pagesPerBatch,
  });

  const handlePageChange = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, currPage === 1 && styles.disabledButton]}
        onPress={() => handlePageChange(1)}
        disabled={currPage === 1}
      >
        <Text style={styles.buttonText}>{"<<"}</Text>
      </Pressable>
      <Pressable
        style={[styles.button, currPage === 1 && styles.disabledButton]}
        onPress={() => handlePageChange(currPage - 1)}
        disabled={currPage === 1}
      >
        <Text style={styles.buttonText}>{"<"}</Text>
      </Pressable>
      {getPageNumbers.map((pageNum) => (
        <Pressable
          disabled={currPage === pageNum}
          key={pageNum}
          style={styles.button}
          onPress={() => handlePageChange(pageNum)}
        >
          <Text
            style={[
              styles.buttonText,
              currPage === pageNum && styles.activeButtonText,
            ]}
          >
            {pageNum}
          </Text>
        </Pressable>
      ))}
      <Pressable
        style={[
          styles.button,
          currPage === totalPages && styles.disabledButton,
        ]}
        onPress={() => handlePageChange(currPage + 1)}
        disabled={currPage === totalPages}
      >
        <Text style={styles.buttonText}>{">"}</Text>
      </Pressable>
      <Pressable
        style={[
          styles.button,
          currPage === totalPages && styles.disabledButton,
        ]}
        onPress={() => handlePageChange(totalPages)}
        disabled={currPage === totalPages}
      >
        <Text style={styles.buttonText}>{">>"}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#FFF",
  },
  buttonText: {
    fontSize: 14,
    color: "#666666",
  },
  activeButtonText: {
    color: "#EF7E22",
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default React.memo(Pagination);
